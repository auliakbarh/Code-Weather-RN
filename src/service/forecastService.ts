import { createApi } from '@reduxjs/toolkit/query/react';
import { thunkBaseQuery, endpoints } from '@/api/';

export const forecastService = createApi({
    reducerPath: 'forecast',
    baseQuery: thunkBaseQuery(),
    endpoints: (builder) => ({
        getForecastByLatLong: builder.query<
            TDataForecast,
            IParamsGetForecastByLatLong
        >({
            query: (params) => ({
                url: endpoints.forecast,
                method: 'GET',
                params,
            }),
        }),
        getForecastByQuery: builder.query<
            TDataForecast,
            IParamsGetForecastByQuery
        >({
            query: (params) => ({
                url: endpoints.forecast,
                method: 'GET',
                params,
            }),
        }),
        getForecastByCityId: builder.query<
            TDataForecast,
            IParamsGetForecastByCityId
        >({
            query: (params) => ({
                url: endpoints.forecast,
                method: 'GET',
                params,
            }),
        }),
    }),
});

export const { useLazyGetForecastByCityIdQuery, useLazyGetForecastByLatLongQuery, useLazyGetForecastByQueryQuery, useGetForecastByLatLongQuery } = forecastService;
