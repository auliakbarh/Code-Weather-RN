declare type TDataGetCurrentWeather = {
    coord: {
        lon: number
        lat: number
    }
    weather: Array<{
        id: number
        main: string
        description: string
        icon: string
    }>
    base: string
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
    }
    visibility: number
    wind: {
        speed: number
        deg: number
    }
    clouds: {
        all: number
    }
    dt: number
    sys: {
        type: number
        id: number
        country: string
        sunrise: number
        sunset: number
    }
    timezone: number
    id: number
    name: string
    cod: number
}

declare interface IGetByLatLong {
    lat: number
    lon: number
    units: 'metric' | 'standard' | 'imperial'
}

/**
 * q: {city name},{state code},{country code}
 */
declare interface IGetByQuery {
    q: string
}
declare interface IGetByCityId {
    id: number
}
