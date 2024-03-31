import * as component from '@/features/views'

export enum SCREEN_NAME {
    'HOME_PAGE' = 'HOME_PAGE',
    'SEARCH_PAGE' = 'SEARCH_PAGE',
    'SETTING_PAGE' = 'SETTING_PAGE',
}

export const SCREENS = {
    HomePage: {
        name: SCREEN_NAME.HOME_PAGE,
        component: component.HomeUI,
    },
    SearchPage: {
        name: SCREEN_NAME.SEARCH_PAGE,
        component: component.SearchUI,
    },
    SettingsPage: {
        name: SCREEN_NAME.SETTING_PAGE,
        component: component.SettingsUI,
    },
}

export const STACK_SCREENS = Object.entries(SCREENS).map(([key, value]) => ({
    ...value,
}));
