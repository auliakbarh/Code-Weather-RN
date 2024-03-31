import React, {useCallback, useEffect} from 'react'
import {FlatList, ListRenderItem, View} from 'react-native'
import {tw} from "@/config/twrnc";
import {SafeArea} from "@/components";
import {HeaderSearch, ListFav} from "@/features/search/components";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {LocationObject} from "expo-location";
import {DEFAULT_LOCATION, setLocation, useLazyGetByLocNameQuery, useLazyReverseGeoQuery} from "@/service";
import {useStyle} from "@/hooks";
import {ListFlag} from "@/features/search/components/ListFlag";
import dayjs from "dayjs";
import {navigation} from "@/routes/Navigation";

export const SearchUI: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const location = useSelector<RootState, LocationObject | null>(state => state.setting.location)
    const [reverseGeo, {data: queriedDataCurrentLoc}] = useLazyReverseGeoQuery()
    const [getByName, {data: queriedDataBySearch}] = useLazyGetByLocNameQuery()

    const favPlace = useSelector<RootState, TDataLocationByQueryName>(state => state.setting.favPlace)

    const data: TDataLocationByQueryName = [...(queriedDataCurrentLoc ?? []) as TDataLocationByQueryName, ...favPlace as TDataLocationByQueryName]

    const setLocationHandler = useCallback((item: TDataLocationByQueryName[number]) => {
        dispatch(setLocation({
            coords: {
                ...DEFAULT_LOCATION.coords,
                latitude: item.lat,
                longitude: item.lon,
            },
            "timestamp": dayjs().valueOf()
        }))
        navigation.goBack()
    }, [])

    const renderList: ListRenderItem<TDataLocationByQueryName[number]> = useCallback(({item, index}) => {
        return (
            <ListFav data={item} isCurrentLoc={index === 0} isFavorite={false} onPress={setLocationHandler}/>
        )
    }, [setLocationHandler])
    const renderListFlag: ListRenderItem<TDataLocationByQueryName[number]> = useCallback(({item, index}) => {
        return (
            <ListFlag data={item} onPress={setLocationHandler} />
        )
    }, [setLocationHandler])

    const lineColor = useStyle('line', 'bg')

    useEffect(() => {
        if (location !== null) {
            reverseGeo({lat: location.coords.latitude, lon: location.coords.longitude, limit: 1})
        }
    }, [location]);

    return (
        <SafeArea>
            <View style={tw`p-4 fill`}>
                <HeaderSearch fn={getByName}/>
                {
                    queriedDataBySearch ?
                        <FlatList
                            data={queriedDataBySearch}
                            extraData={queriedDataBySearch}
                            renderItem={renderListFlag}
                            ItemSeparatorComponent={() => <View style={tw.style(`h-[1px]`, lineColor)}/>}
                            keyExtractor={(item, index) => `${item.name}_${index}`}
                        />
                        :
                        <FlatList
                            data={data}
                            extraData={data}
                            renderItem={renderList}
                            ItemSeparatorComponent={() => <View style={tw.style(`h-[1px]`, lineColor)}/>}
                            keyExtractor={(item, index) => `${item.name}_${index}`}
                        />
                }
            </View>
        </SafeArea>
    )
}
