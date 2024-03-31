import React, {useEffect} from 'react'
import {Text, View, ScrollView} from 'react-native'
import Toast from "react-native-root-toast";
import * as Location from "expo-location";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

import {tw} from "@/config/twrnc";
import {SafeArea} from "@/components";
import {setLocation} from "@/service";
import {HeaderHome} from "@/features/home/components";
import {useStyle} from "@/hooks";
export const HomeUI: React.FC = () => {
    const dispatch = useDispatch()
    const {t} = useTranslation("screen-tag")
    useEffect(() => {
        void (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                Toast.show('Permission to access location was denied, using "Medan, ID" as default location', { duration: Toast.durations.LONG })
                return
            }

            const location = await Location.getCurrentPositionAsync({});
            dispatch(setLocation(location))
        })();
    }, []);
    const textStyle = useStyle('text', 'text')
    return (
        <SafeArea>
            <View style={tw`p-4 fill`}>
                <HeaderHome />
                <ScrollView bounces>
                    <Text style={tw`body-sm-italic ${textStyle}`}>{t("home")}</Text>
                </ScrollView>
            </View>
        </SafeArea>
    )
}
