import {configureStore, createDraftSafeSelector} from '@reduxjs/toolkit'
import { geolocationService, currentWeatherService, airPollutionService, forecastService, settingSlice } from '@/service'

export const store = configureStore({
    reducer: {
        [geolocationService.reducerPath]: geolocationService.reducer,
        [currentWeatherService.reducerPath]: currentWeatherService.reducer,
        [airPollutionService.reducerPath]: airPollutionService.reducer,
        [forecastService.reducerPath]: forecastService.reducer,
        [settingSlice.reducerPath]: settingSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(geolocationService.middleware)
        .concat(currentWeatherService.middleware)
        .concat(airPollutionService.middleware)
        .concat(forecastService.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const createTypedDraftSafeSelector =
    createDraftSafeSelector.withTypes<RootState>()
