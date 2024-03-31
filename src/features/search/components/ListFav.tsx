import React, {useCallback, useMemo} from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import {AntDesign, Feather} from "@expo/vector-icons";
import {useAppColor, useStyle} from "@/hooks";
import {tw} from "@/config/twrnc";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {setFavPlace, useGetWeatherByLatLongQuery} from '@/service';
import {ShimmerPlaceholder, WeatherIcon} from "@/components";

interface IListFavProps {
    data: TDataLocationByQueryName[number]
    isCurrentLoc: boolean
    isFavorite?: boolean
    onPress?: (item: IListFavProps['data']) => void
}

export const ListFav: React.FC<IListFavProps> = ({data, isFavorite, isCurrentLoc, onPress}) => {
    const dispatch = useDispatch<AppDispatch>()
    const lang = useSelector<RootState, TAppLang>(state => state.setting.lang)
    const favPlace = useSelector<RootState, TDataLocationByQueryName>(state => state.setting.favPlace)
    const iconColor = useAppColor('neutral', 'black')
    const textStyle = useStyle('text', 'text')

    const iconNameStar = useMemo(() => {
        const find = favPlace.find(i => i.lat === data.lat && i.lon === data.lon)
        if (find) {
            return 'star'
        }
        return isFavorite ? 'star' : 'staro'
    }, [isFavorite, favPlace])
    const onPressStar = useCallback((item: TDataLocationByQueryName[number]) => () => {
        if (isCurrentLoc) {
            return
        }
        dispatch(setFavPlace(item))
    }, [isFavorite, isCurrentLoc])
    const {data: weather, isLoading} = useGetWeatherByLatLongQuery({lat: data.lat, lon: data.lon, units: 'metric'})

    return (
        <TouchableOpacity style={tw`row items-center pr-2 py-3`} onPress={() => onPress?.(data)}>
            <View style={tw`row items-center flex-2 mr-3`}>
                {isCurrentLoc ? (
                        <Feather
                            name="map-pin" size={16} color={iconColor} style={tw`p-2`}
                        />) :
                    <TouchableOpacity onPress={onPressStar(data)} style={tw`p-2`}>
                        <AntDesign name={iconNameStar} size={16} color={iconColor}/>
                    </TouchableOpacity>}
                <Text style={tw.style(`body-lg ml-3`, textStyle)}>{`${data?.local_names?.[lang] ?? data.name}, ${data.state}, ${data.country}`}</Text>
            </View>
            <View style={tw`flex-0.2`} />
            <ShimmerPlaceholder visible={!isLoading} style={tw`min-w-5 ml-2`}>
                <View style={tw`row items-center`}>
                    <Text style={tw.style(`body mr-2`, textStyle)}>{weather?.main.temp}°C</Text>
                    <WeatherIcon icon={weather?.weather[0]?.icon} size={2} style={tw`h-10 w-10`} height={20} width={20} />
                </View>
            </ShimmerPlaceholder>
        </TouchableOpacity>
    )
}
