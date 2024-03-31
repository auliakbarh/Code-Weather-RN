import {tw} from "@/config/twrnc";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useMemo} from "react";

/**
 * return opposite color
 */
export const useAppColor = (dark: TAppColors, light: TAppColors): string => {
    const theme = useSelector<RootState, TColorScheme>(state => state.setting.colorScheme)
    return useMemo(() => tw.color(((): TAppColors => {
        switch (theme) {
            case "light":
                return light
            case "dark":
            default:
                return dark
        }
    })()) as string, [theme, light, dark])
}

type TDefinedColor = 'text' | 'bg' | 'fill' | 'orange' | 'green' | 'neutral' | 'white' | 'black' | 'smoke' | 'line' | 'placeholder' | 'input'

const COLOR_PURPOSES: Record<TDefinedColor, { dark: TAppColors, light: TAppColors }> = {
    text: { dark: 'neutral', light: 'black' },
    bg: { dark: 'black', light: 'white' },
    fill: { dark: 'neutral', light: 'black' },
    orange: { dark: 'orange', light: 'orangeBright' },
    green: { dark: 'green', light: 'greenBright' },
    neutral: { dark: 'black', light: 'neutral' },
    white: { dark: 'black', light: 'white' },
    black: { dark: 'neutral', light: 'black' },
    smoke: { dark: 'gray', light: 'smoke' },
    line: { dark: 'gray', light: 'smoke' },
    placeholder: { dark: 'smoke', light: 'gray' },
    input: { dark: 'gray', light: 'softGray' },
}
export const useColor = (purpose: TDefinedColor): string => {
    return useAppColor(COLOR_PURPOSES[purpose].dark, COLOR_PURPOSES[purpose].light)
}
export const useStyle = (purpose: TDefinedColor, style: 'text' | 'bg' | 'border'): string => {
    const theme = useSelector<RootState, TColorScheme>(state => state.setting.colorScheme)
    return useMemo(() => `${style}-${COLOR_PURPOSES[purpose].light} dark:${style}-${COLOR_PURPOSES[purpose].dark}`, [theme, style, purpose])
}
