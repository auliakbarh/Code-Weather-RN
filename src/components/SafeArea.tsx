import React, {useCallback} from 'react'
import {View, ViewProps} from 'react-native'
import {useSafeAreaInsets} from "react-native-safe-area-context";

import tw from "@/config/twrnc";

interface ISafeAreaProps extends React.PropsWithChildren, ViewProps {
    set?: Array<'all' | 't' | 'b' | 'l' | 'r'>
}

export const SafeArea: React.FC<ISafeAreaProps> = ({children, set, ...props}) => {
    const insets = useSafeAreaInsets()
    const setPadding = useCallback((set: ISafeAreaProps['set']) => {
        const all = [
            `pt-[${insets.top}px]`,
            `pb-[${insets.bottom}px]`,
            `pl-[${insets.left}px]`,
            `pr-[${insets.right}px]`,
        ]
        if (set === undefined) {
            return all
        }
        return set.map(i => {
            switch (i) {
                case "b":
                    return `pb-[${insets.bottom}px]`
                case "t":
                    return `pt-[${insets.top}px]`
                case "l":
                    return `pl-[${insets.left}px]`
                case "r":
                    return `pr-[${insets.right}px]`
                case "all":
                default:
                    return all.join(' ')
            }
        })
    }, [insets])
    return (
        <View {...props} style={[tw.style(
            'bgr-neutral fill',
            setPadding(set).join(' '),
        ), props.style]}>
            {children}
        </View>
    )
}
