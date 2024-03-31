import React, {useCallback, useEffect, useMemo} from 'react'
import {ActivityIndicator, FlatList, ListRenderItem, RefreshControl, ScrollView, Text, View} from 'react-native'
import Toast from "react-native-root-toast";
import * as Location from "expo-location";
import {LocationObject} from "expo-location";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {MaterialIcons} from '@expo/vector-icons';
import dayjs from "dayjs";

import {tw} from "@/config/twrnc";
import {SafeArea, WeatherIcon} from "@/components";
import {
    DEFAULT_LOCATION,
    setLocation,
    useLazyGetForecastByLatLongQuery,
    useLazyGetWeatherByLatLongQuery
} from "@/service";
import {HeaderHome} from "@/features/home/components";
import {useColor, useStyle} from "@/hooks";
import {RootState} from "@/store";
import {numberFormat} from "@/utils/functions";

/**
 * some of data not provided by API
 */

const getCurrentWeather = require('../../../api/mockup/currentWeather/getCurrentWeather.json')
export const HomeUI: React.FC = () => {
    const dispatch = useDispatch()
    const {t} = useTranslation("home")
    const {t: tCommon} = useTranslation("common")
    const location = useSelector<RootState, LocationObject | null>(state => state.setting.location)

    const [getWeather, {data, isLoading}] = useLazyGetWeatherByLatLongQuery()
    const [getForcast, {data: forecastData, isLoading: isLoadingForecast }] = useLazyGetForecastByLatLongQuery()

    const onRefresh = useCallback(() => {
        getWeather({
            lat: location?.coords.latitude ?? DEFAULT_LOCATION.coords.latitude,
            lon: location?.coords.longitude ?? DEFAULT_LOCATION.coords.longitude,
            units: 'metric',
        })
        getForcast({
            lat: location?.coords.latitude ?? DEFAULT_LOCATION.coords.latitude,
            lon: location?.coords.longitude ?? DEFAULT_LOCATION.coords.longitude,
        })
    }, [location])

    const textStyle = useStyle('text', 'text')
    const fillColor = useColor('fill')
    const lineColor = useStyle('line', 'bg')

    const renderList: ListRenderItem<TDataForecast['list'][number]> = useCallback(({ item }) => {
        return (
            <View style={tw`row items-center justify-between py-3`}>
                <Text style={tw.style(textStyle, 'body-sm flex-2')}>{dayjs(item.dt_txt, "YYYY-MM-DD HH:mm:ss").format('ddd MMM YY')}</Text>
                <View style={tw`row items-center justify-end flex-1`}>
                    <Text style={tw.style(textStyle, 'footnote text-right flex-1')}>{`${item.main.temp} / ${item.main.feels_like} °C`}</Text>
                    <WeatherIcon size={4} icon={item.weather[0].icon} style={tw`h-6 w-6 ml-3 self-end`} height={24} width={24} />
                </View>
            </View>
        )
    }, [textStyle])

    useEffect(() => {
        void (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                Toast.show('Permission to access location was denied, using "Medan, ID" as default location', {duration: Toast.durations.LONG})
                return
            }

            const location = await Location.getCurrentPositionAsync({});
            dispatch(setLocation(location))
        })();
    }, []);

    const refreshControl = useMemo(() => {
        return <RefreshControl refreshing={isLoading} onRefresh={onRefresh}/>
    }, [isLoading, onRefresh])

    const useMockData: boolean = __DEV__

    const dataToRender = useMockData ? (data ?? getCurrentWeather) : data

    return (
        <SafeArea>
            <View style={tw`p-4 fill`}>
                <HeaderHome/>
                {
                    isLoading ?
                        <View style={tw`fill center`}><ActivityIndicator size="large"
                                                                         color={tw.color('orange')}/></View>
                        :
                        <ScrollView bounces refreshControl={refreshControl} contentContainerStyle={tw`p-4`} showsVerticalScrollIndicator={false}>
                            <View>
                                <View style={tw`center`}>
                                    <View style={tw`row items-center`}>
                                        <WeatherIcon icon={dataToRender.weather[0].icon} size={4}
                                                     style={tw`h-20 w-20`}/>
                                        <View>
                                            <Text
                                                style={tw.style(textStyle, 'body-lg-medium')}>{dataToRender.weather[0].main}</Text>
                                            <Text
                                                style={tw.style(textStyle, 'caption-light')}>{dataToRender.weather[0].description}</Text>
                                        </View>
                                    </View>
                                    <Text
                                        style={tw.style(textStyle, 'h1-light text-center text-[40px]')}>{dataToRender.main.temp}°C</Text>
                                    <Text
                                        style={tw.style(textStyle, 'caption-light text-center mt-3')}>{t('feels-like', {temp: `${dataToRender.main.feels_like}°C`})}</Text>
                                </View>
                                <View style={tw`bg-softGray dark:bg-gray rounded-2 px-2 py-3 mt-3`}>
                                    <View style={tw`row items-center justify-between`}>
                                        <View style={tw`row items-center`}>
                                            <Text
                                                style={tw.style(textStyle, 'footnote-bold text-[8px]')}>{`${tCommon('wind')}: ${dataToRender.wind.speed}m/s SSE`}</Text>
                                            <MaterialIcons name="navigation" size={14} color={fillColor} style={{
                                                transform: [{rotate: dataToRender.wind.deg + 'deg'}],
                                            }}/>
                                        </View>
                                        <Text
                                            style={tw.style(textStyle, 'footnote-bold text-[8px]')}>{`${tCommon('humidity')}: ${dataToRender.main.humidity}%`}</Text>
                                        <Text
                                            style={tw.style(textStyle, 'footnote-bold text-[8px]')}>{`${tCommon('uv-index')}: 1.1`}</Text>
                                        <Text
                                            style={tw.style(textStyle, 'footnote-bold text-[8px]')}>{`${tCommon('pressure')}: ${dataToRender.main.pressure}hPa`}</Text>
                                    </View>
                                    <View style={tw`row items-center justify-between mt-2`}>
                                        <Text
                                            style={tw.style(textStyle, 'footnote-bold text-[8px]')}>{`${tCommon('visibility')}: ${numberFormat((dataToRender.visibility / 1000), 1, '.', '')}km`}</Text>
                                        <Text
                                            style={tw.style(textStyle, 'footnote-bold text-[8px]')}>{`${tCommon('dew-point')}: 9°C`}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={tw`mt-4`}>
                                {
                                    isLoadingForecast ?
                                        <View style={tw`center`}><ActivityIndicator size="small" color={tw.color('orange')}/></View>
                                        :
                                        <ScrollView horizontal bounces={false} contentContainerStyle={tw`w-full`}>
                                            <FlatList
                                                data={forecastData?.list ?? []}
                                                extraData={forecastData}
                                                renderItem={renderList}
                                                keyExtractor={item => `${item.dt}`}
                                                ItemSeparatorComponent={() => <View style={tw.style(`h-[1px]`, lineColor)}/>
                                                } />
                                        </ScrollView>
                                }
                            </View>
                        </ScrollView>
                }
            </View>
        </SafeArea>
    )
}
