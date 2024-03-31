import {HomeUI} from '@/features/home/views/HomeUI'
import {SearchUI} from '@/features/search/views/SearchUI'
import {SettingsUI} from '@/features/settings/views/SettingsUI'
import {SCREEN_NAME} from "@/routes/stacks/types/screenName";

export const SCREENS = {
    HomePage: {
        name: SCREEN_NAME.HOME_PAGE,
        component: HomeUI,
    },
    SearchPage: {
        name: SCREEN_NAME.SEARCH_PAGE,
        component: SearchUI,
    },
    SettingsPage: {
        name: SCREEN_NAME.SETTING_PAGE,
        component: SettingsUI,
    },
}

export const STACK_SCREENS = Object.entries(SCREENS).map(([key, value]) => ({
    ...value,
}));
