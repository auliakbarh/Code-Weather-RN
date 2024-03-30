import { createApi } from '@reduxjs/toolkit/query/react';
import { thunkBaseQuery, endpoints } from '@/api/';

export const currentWeatherService = createApi({
    reducerPath: 'currentWeather',
    baseQuery: thunkBaseQuery(),
    endpoints: (builder) => ({
        getWeatherByLatLong: builder.query<
            TDataGetCurrentWeather,
            IGetByLatLong
        >({
            query: (params) => ({
                url: endpoints.currentWeather,
                method: 'GET',
                params,
            }),
        }),
        getWeatherByQuery: builder.query<
            TDataGetCurrentWeather,
            IGetByQuery
        >({
            query: (params) => ({
                url: endpoints.currentWeather,
                method: 'GET',
                params,
            }),
        }),
        getWeatherByCityId: builder.query<
            TDataGetCurrentWeather,
            IGetByCityId
        >({
            query: (params) => ({
                url: endpoints.currentWeather,
                method: 'GET',
                params,
            }),
        }),
    }),
});

export const { useLazyGetWeatherByCityIdQuery, useLazyGetWeatherByLatLongQuery, useLazyGetWeatherByQueryQuery, useGetWeatherByLatLongQuery } = currentWeatherService;
