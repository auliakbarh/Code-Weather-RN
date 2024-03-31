import React, {useCallback, useEffect} from 'react'
import {FlatList, ListRenderItem, View} from 'react-native'
import {tw} from "@/config/twrnc";
import {SafeArea} from "@/components";
import {HeaderSearch, ListFav} from "@/features/search/components";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {LocationObject} from "expo-location";
import {useLazyGetByLocNameQuery, useLazyReverseGeoQuery} from "@/service";
import {useStyle} from "@/hooks";
import {ListFlag} from "@/features/search/components/ListFlag";

export const SearchUI: React.FC = () => {
    const location = useSelector<RootState, LocationObject | null>(state => state.setting.location)
    const [reverseGeo, {data: queriedDataCurrentLoc}] = useLazyReverseGeoQuery()
    const [getByName, {data: queriedDataBySearch}] = useLazyGetByLocNameQuery()

    const favPlace = useSelector<RootState, TDataLocationByQueryName>(state => state.setting.favPlace)

    const data: TDataLocationByQueryName = [...(queriedDataCurrentLoc ?? []) as TDataLocationByQueryName, ...favPlace as TDataLocationByQueryName]

    const renderList: ListRenderItem<TDataLocationByQueryName[number]> = useCallback(({item, index}) => {
        return (
            <ListFav data={item} isCurrentLoc={index === 0} isFavorite={false}/>
        )
    }, [])
    const renderListFlag: ListRenderItem<TDataLocationByQueryName[number]> = useCallback(({item, index}) => {
        return (
            <ListFlag data={item} />
        )
    }, [])

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
