import { createApi } from '@reduxjs/toolkit/query/react';
import { thunkBaseQuery, endpoints } from '@/api/';

export const geolocationService = createApi({
    reducerPath: 'geolocation',
    baseQuery: thunkBaseQuery(),
    endpoints: (builder) => ({
        getByLocName: builder.query<
            TDataLocationByQueryName,
            IParamsGetLocationByQueryName
        >({
            query: (params) => ({
                url: endpoints.geolocation.getByLocName,
                method: 'GET',
                params,
            }),
        }),
        getByZipCode: builder.query<
            TDataLocationByZipCode,
            IParamsGetLocationByZipCode
        >({
            query: (params) => ({
                url: endpoints.geolocation.getByZipCode,
                method: 'GET',
                params,
            }),
        }),
        reverseGeo: builder.query<
            TDataReverseGeolocation,
            IParamsReverseGeolocation
        >({
            query: (params) => ({
                url: endpoints.geolocation.reverseGeo,
                method: 'GET',
                params,
            }),
        }),
    }),
});

export const { useLazyGetByLocNameQuery, useLazyGetByZipCodeQuery, useLazyReverseGeoQuery } = geolocationService;
