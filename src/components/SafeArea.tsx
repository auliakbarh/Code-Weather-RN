import React from 'react'
import {View, ViewProps} from 'react-native'
import {useSafeAreaInsets} from "react-native-safe-area-context";

import tw from "@/config/twrnc";

interface ISafeAreaProps extends React.PropsWithChildren, ViewProps {}
export const SafeArea: React.FC<ISafeAreaProps> = ({ children, ...props }) => {
    const insets = useSafeAreaInsets()
    return (
        <View {...props} style={[tw`bg-white dark:bg-black fill pt-[${insets.top}px] pb-[${insets.bottom}px] pl-[${insets.left}px] pr-[${insets.right}px]`, props.style]}>
            {children}
        </View>
    )
}
