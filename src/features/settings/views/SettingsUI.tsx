import React, {useCallback, useMemo} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {useTranslation} from "react-i18next";
import {MaterialIcons} from '@expo/vector-icons';
import {useAppColorScheme} from 'twrnc';
import {useDispatch, useSelector} from "react-redux";
import {tw} from "@/config/twrnc";
import {Header, SafeArea} from "@/components";
import {useColor, useStyle} from "@/hooks";
import {capitalizedFirstLetter} from "@/utils/functions";
import {AppDispatch, RootState} from "@/store";
import {setColorScheme, setLang} from "@/service";

interface IList {
    label: string
    onPress?: () => void
    rightComp?: React.ReactNode
}
export const SettingsUI: React.FC = () => {
    const { t} = useTranslation('common')
    const { t: tSetting, i18n} = useTranslation('setting')

    const lang = useSelector<RootState, TAppLang>(state => state.setting.lang)

    const dispatch = useDispatch<AppDispatch>()

    const [colorScheme,, setColorSchemeTw] = useAppColorScheme(tw);

    const changeLanguage = useCallback(async () => {
        switch (lang) {
            case "en":
                await i18n.changeLanguage('id')
                dispatch(setLang('id'))
                break
            case "id":
                await i18n.changeLanguage('en')
                dispatch(setLang('en'))
                break
        }
    }, [lang, i18n])

    const toggleTheme = useCallback(() => {
        switch (colorScheme) {
            case 'dark':
                setColorSchemeTw('light')
                dispatch(setColorScheme('light'))
                break
            case 'light':
                setColorSchemeTw('dark')
                dispatch(setColorScheme('dark'))
                break
        }
    }, [colorScheme, setColorSchemeTw])

    const textStyle = useStyle('text', "text")

    const list: IList[] = useMemo(() => [
        {
            label: tSetting('language'),
            onPress: changeLanguage,
            rightComp: <Text style={tw.style(textStyle)}>{tSetting(lang as string)}</Text>
        },
        {
            label: tSetting('theme'),
            onPress: toggleTheme,
            rightComp: <Text style={tw.style(textStyle)}>{tSetting(colorScheme as string)}</Text>
        },
    ], [toggleTheme, colorScheme, changeLanguage, textStyle])

    const fillColor = useColor('fill')

    return (
        <SafeArea>
            <Header/>
            <View style={tw`fill`}>
                <ScrollView contentContainerStyle={tw`py-6 px-4`}>
                    {list.map(item => {
                        return (
                            <TouchableOpacity key={item.label} onPress={item.onPress} style={tw`row items-center justify-between px-2 py-3`}>
                                <View style={tw`flex-1`}>
                                    <Text style={tw`body ${textStyle}`}>{capitalizedFirstLetter(item.label)}</Text>
                                </View>
                                <View>
                                    {item.rightComp ? item.rightComp : <MaterialIcons name="chevron-right" size={24} color={fillColor} />}
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                    <View style={tw`h-5`} />
                    <Text style={tw`body-sm ${textStyle}`}>{t('about-app')}</Text>
                    <Text style={tw`mt-3 body-sm-italic ${textStyle}`}>{t('created-by-author')}</Text>
                </ScrollView>
            </View>
        </SafeArea>
    )
}
