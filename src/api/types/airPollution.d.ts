declare interface IParamsGetCurrentAirPollution {
    lat: number
    lon: number
}
declare interface IParamsGetForecastAirPollution {
    lat: number
    lon: number
}

/**
 * start: Start date (unix time, UTC time zone), e.g. start=1606488670
 *
 * end: End date (unix time, UTC time zone), e.g. end=1606747870
 */
declare interface IParamsGetHistoryAirPollution {
    lat: number
    lon: number
    start: number
    end: number
}

declare type TDataGetCurrentAirPollution = {
    coord: {
        lon: number
        lat: number
    }
    list: Array<{
        main: {
            aqi: number
        }
        components: {
            co: number
            no: number
            no2: number
            o3: number
            so2: number
            pm2_5: number
            pm10: number
            nh3: number
        }
        dt: number
    }>
}
declare type TDataGetForecastAirPollution = {
    coord: {
        lon: number
        lat: number
    }
    list: Array<{
        main: {
            aqi: number
        }
        components: {
            co: number
            no: number
            no2: number
            o3: number
            so2: number
            pm2_5: number
            pm10: number
            nh3: number
        }
        dt: number
    }>
}
declare type TDataGetHistoryAirPollution = {
    coord: {
        lon: number
        lat: number
    }
    list: Array<{
        main: {
            aqi: number
        }
        components: {
            co: number
            no: number
            no2: number
            o3: number
            so2: number
            pm2_5: number
            pm10: number
            nh3: number
        }
        dt: number
    }>
}
