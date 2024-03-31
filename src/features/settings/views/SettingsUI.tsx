import React from 'react'
import {Text} from 'react-native'
import tw from "@/config/twrnc";
import {SafeArea} from "@/components";

export const SettingsUI: React.FC = () => {
    return (
        <SafeArea>
            <Text style={tw`body-sm-italic txt-orangeBright`}>Settings</Text>
        </SafeArea>
    )
}