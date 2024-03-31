/**
 * q: City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes. {city name},{state code},{country code}
 *
 * limit: opt: Number of the locations in the API response (up to 5 results can be returned in the API response)
 */
declare interface IParamsGetLocationByQueryName {
    q: string
    limit?: number
}

declare type TDataLocationByQueryName = Array<{
    name: string
    local_names: Record<string, string>
    lat: number
    lon: number
    country: string
    state: string
}>

/**
 * zip: {zip code},{country code}
 */
declare interface IParamsGetLocationByZipCode {
    zip: string
}

declare type TDataLocationByZipCode = {
    zip: string
    name: string
    lat: number
    lon: number
    country: string
}

declare interface IParamsReverseGeolocation {
    lat: number
    lon: number
    limit?: number
}

declare type TDataReverseGeolocation = Array<{
    name: string
    local_names: Record<string, string>
    lat: number
    lon: number
    country: string
    state: string
}>
