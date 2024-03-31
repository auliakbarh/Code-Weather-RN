import React, {useMemo} from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import {Octicons} from '@expo/vector-icons';
import {tw} from "@/config/twrnc";
import {useAppColor, useStyle} from "@/hooks";
import {navigation} from "@/routes/Navigation";
import {useTranslation} from "react-i18next";

interface IHeaderProps {
    prevName?: string
}

export const Header: React.FC<IHeaderProps> = ({prevName}) => {
    const canGoBack = navigation.navigationRef.current?.canGoBack() ?? false
    const {t: tScreenName} = useTranslation('screen-name')
    const prevRouteName = navigation.getPrevRouteName()
    const prevNameText = useMemo(() => {
        if (prevName) {
            return prevName
        }
        return prevRouteName ? tScreenName(prevRouteName) : ''
    }, [prevRouteName, prevName, tScreenName])
    const currentName = navigation.getCurrentRouteName()

    return (
        <View style={tw`py-2 px-4 row items-center border-b ${useStyle('smoke', 'border')}`}>
            <View style={tw`row items-center flex-1`}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={tw.style(!canGoBack ? 'hidden' : 'row items-center flex-1')}
                >
                    <Octicons name="chevron-left" size={32} color={useAppColor('neutral', 'black')}/>
                    <View style={tw.style(prevNameText === undefined ? 'hidden' : 'ml-4')}>
                        <Text style={tw`body ${useStyle('text', 'text')}`}>{prevNameText}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={tw`flex-2`}>
                <Text style={tw`h3-bold ${useStyle('text', 'text')} text-center`}>{currentName ? tScreenName(currentName) : ''}</Text>
            </View>
            <View style={tw`flex-1`} />
        </View>
    )
}
