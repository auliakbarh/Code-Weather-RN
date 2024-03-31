import React, {useEffect} from 'react'
import {Text} from 'react-native'
import Toast from "react-native-root-toast";
import * as Location from "expo-location";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

import tw from "@/config/twrnc";
import {SafeArea} from "@/components";
import {setLocation} from "@/service";
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
    return (
        <SafeArea>
            <Text style={tw`body-sm-italic txt-orangeBright`}>{t("home")}</Text>
        </SafeArea>
    )
}
