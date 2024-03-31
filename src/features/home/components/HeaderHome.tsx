import React, {useEffect} from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";
import {useAppColor, useStyle} from "@/hooks";
import {useSelector} from "react-redux";
import {LocationObject} from "expo-location";

import {RootState} from "@/store";
import {useLazyReverseGeoQuery} from "@/service";
import {ShimmerPlaceholder} from "@/components";
import {navigation} from "@/routes/Navigation";
import {SCREENS} from "@/routes/stacks/screens";
import {tw} from "@/config/twrnc";

export const HeaderHome: React.FC = () => {
    const location = useSelector<RootState, LocationObject | null>(state => state.setting.location)
    const lang = useSelector<RootState, TAppLang>(state => state.setting.lang)
    const [reverseGeo, {isLoading, data}] = useLazyReverseGeoQuery()

    useEffect(() => {
        if (location !== null) {
            reverseGeo({lat: location.coords.latitude, lon: location.coords.longitude, limit: 1})
        }
    }, [location]);

    const iconColor = useAppColor('neutral', 'black')
    const textStlye = useStyle('text', 'text')

    return (
        <View style={tw`row justify-between py-2`}>
            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.SearchPage.name)} style={tw`row items-center flex-1`}>
                <Ionicons name="search" size={24} color={iconColor}/>
                <ShimmerPlaceholder visible={!isLoading} style={tw`min-w-50 ml-2`}>
                    <View style={tw`row items-center`}>
                        <Text
                            style={tw`body-lg ${textStlye} mr-2`}>{data && data.length > 0 ? data[0]['local_names'][lang] : ''}</Text>
                        <Feather
                            name="map-pin" size={14} color={iconColor}/>
                    </View>
                </ShimmerPlaceholder>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.SettingsPage.name)}>
                <Feather
                    name="menu" size={24} color={iconColor}/>
            </TouchableOpacity>
        </View>
    )
}
