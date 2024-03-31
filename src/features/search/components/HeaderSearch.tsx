import React from 'react'
import {TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {useAppColor, useStyle} from "@/hooks";
import {useTranslation} from "react-i18next";

import {useLazyGetByLocNameQuery} from "@/service";
import {navigation} from "@/routes/Navigation";
import {tw} from "@/config/twrnc";

interface IHeaderSearchProps {
    fn?: ReturnType<typeof useLazyGetByLocNameQuery>[0]
}
export const HeaderSearch: React.FC<IHeaderSearchProps> = ({ fn }) => {
    const {t} = useTranslation('common')
    const iconColor = useAppColor('neutral', 'black')
    const textStlye = useStyle('text', 'text')
    const bgInputText = useStyle('input', 'bg')
    const placeholderColor = useAppColor('smoke', 'gray')

    return (
        <View style={tw`row justify-between items-center py-2`}>
            <View style={tw`row items-center flex-1 ${bgInputText} px-2 py-2 rounded-8 mr-3`}>
                <Ionicons name="search" size={24} color={iconColor}/>
                <TextInput
                    style={tw`fill ml-2 body-lg ${textStlye}`}
                    placeholder={t('search')}
                    placeholderTextColor={placeholderColor}
                    onEndEditing={e => {
                        fn?.({ q: e.nativeEvent.text, limit: 50 })
                    }}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name="window-close" size={24} color={iconColor}/>
            </TouchableOpacity>
        </View>
    )
}
