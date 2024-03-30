import { createApi } from '@reduxjs/toolkit/query/react';
import { thunkBaseQuery, endpoints } from '@/api/';

export const airPollutionService = createApi({
    reducerPath: 'airPollution',
    baseQuery: thunkBaseQuery(),
    endpoints: (builder) => ({
        getCurrent: builder.query<
            TDataGetCurrentAirPollution,
            IParamsGetCurrentAirPollution
        >({
            query: (params) => ({
                url: endpoints.airPollution.getCurrent,
                method: 'GET',
                params,
            }),
        }),
        getForecast: builder.query<
            TDataGetForecastAirPollution,
            IParamsGetForecastAirPollution
        >({
            query: (params) => ({
                url: endpoints.airPollution.getForecast,
                method: 'GET',
                params,
            }),
        }),
        getHistory: builder.query<
            TDataGetHistoryAirPollution,
            IParamsGetHistoryAirPollution
        >({
            query: (params) => ({
                url: endpoints.airPollution.getHistory,
                method: 'GET',
                params,
            }),
        }),
    }),
});

export const { useLazyGetCurrentQuery, useLazyGetForecastQuery, useLazyGetHistoryQuery, useGetCurrentQuery } = airPollutionService;
