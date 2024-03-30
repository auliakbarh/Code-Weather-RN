export const endpoints = {
    geolocation: {
        getByLocName: '/geo/1.0/direct',
        getByZipCode: '/geo/1.0/zip',
        reverseGeo: '/geo/1.0/reverse',
    },
    currentWeather: '/data/2.5/weather',
    airPollution: {
        getCurrent: '/data/2.5/air_pollution',
        getForecast: '/data/2.5/air_pollution/forecast',
        getHistory: '/data/2.5/air_pollution/history',
    },
    forecast: '/data/2.5/forecast'
}
