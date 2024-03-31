import React, {useCallback, useMemo} from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {AntDesign} from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import {AppDispatch, RootState} from "@/store";
import {useAppColor, useStyle} from "@/hooks";
import {setFavPlace} from "@/service";
import {tw} from "@/config/twrnc";

interface IListFlagProps {
    data: TDataLocationByQueryName[number]
    onPress?: (item: IListFlagProps['data']) => void
}

export const ListFlag: React.FC<IListFlagProps> = ({data, onPress}) => {
    const dispatch = useDispatch<AppDispatch>()
    const favPlace = useSelector<RootState, TDataLocationByQueryName>(state => state.setting.favPlace)
    const iconColor = useAppColor('neutral', 'black')
    const textStyle = useStyle('text', 'text')
    const iconNameStar = useMemo(() => {
        const find = favPlace.find(i => i.lat === data.lat && i.lon === data.lon)
        return find ? 'star' : 'staro'
    }, [favPlace])
    const onPressStar = useCallback((item: TDataLocationByQueryName[number]) => () => {
        dispatch(setFavPlace(item))
    }, [])

    return (
        <TouchableOpacity style={tw`row items-center pr-2 py-3`} onPress={() => onPress?.(data)}>
            <CountryFlag isoCode={data.country.toLowerCase()} style={tw`rounded-full h-7 w-7`} size={28}/>
            <View style={tw`flex-2`}>
                <Text style={tw.style(`body ml-3`, textStyle)}>{
                    [
                        data.name,
                        data.state,
                        data.country
                    ].filter(i => i !== undefined).join(', ')
                }</Text>
            </View>
            <TouchableOpacity onPress={onPressStar(data)} style={tw`p-2`}>
                <AntDesign name={iconNameStar} size={16} color={iconColor}/>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
