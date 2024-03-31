import React, {useMemo} from "react";
import {Image, ImageProps} from "react-native";

interface IWeatherIconProps extends Omit<ImageProps, 'source'> {
    icon?: TDataGetCurrentWeather['weather'][number]['icon']
    size: 1 | 2 | 4
}
export const WeatherIcon: React.FC<IWeatherIconProps> = ({ icon, size, ...props}) => {
    const baseUrl: string =  'https://openweathermap.org/img/wn/'
    const ext: string = '.png'
    const imgSize = useMemo(() => {
        switch (size) {
            case 1:
                return ''
            case 4:
                return '@4x'
            case 2:
                return '@2x'
        }
    }, [size])

    const fullUri = baseUrl + (icon ?? '03d') + imgSize + ext

    return <Image source={{ uri: fullUri }} {...props} />
}
