import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {LocationObject} from 'expo-location'
import dayjs from 'dayjs'
import {apiConstants} from '@/api/mockup/constants'
export interface SettingState {
    location: LocationObject | null
    colorScheme: TColorScheme
    lang: TAppLang
    favPlace: TDataLocationByQueryName
}

const initialState: SettingState = {
    location: null,
    colorScheme: 'dark',
    lang: 'id',
    favPlace: [],
}

export const DEFAULT_LOCATION: LocationObject = {
    "coords": {
        "speed": -1,
        "longitude": apiConstants.lon,
        "latitude": apiConstants.lat,
        "accuracy": 5,
        "heading": -1,
        "altitude": 0,
        "altitudeAccuracy": -1
    },
    "timestamp": dayjs().valueOf()
}

export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<LocationObject | undefined>) => {
            if (action.payload === undefined) {
                state.location = {
                    ...DEFAULT_LOCATION,
                    "timestamp": dayjs().valueOf()
                }
                return
            }
            state.location = action.payload
        },
        setColorScheme: (state, action: PayloadAction<TColorScheme>) => {
            state.colorScheme = action.payload
        },
        setLang: (state, action: PayloadAction<TAppLang>) => {
            state.lang = action.payload
        },
        setFavPlace: (state, action: PayloadAction<TDataLocationByQueryName[number]>) => {
            const find = state.favPlace.find(i => i.lat === action.payload.lat && i.lon === action.payload.lon)
            state.favPlace = find ? state.favPlace.filter(i => i.lat !== find.lat && i.lon !== find.lon) : [...state.favPlace, action.payload]
        },
        reset: (state) => {
            state = {
                ...initialState, location: {
                    ...DEFAULT_LOCATION,
                    "timestamp": dayjs().valueOf()
                }
            }
        }
    },
})

export const {setLocation, reset, setLang, setColorScheme, setFavPlace} = settingSlice.actions
