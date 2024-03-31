import 'intl-pluralrules';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from 'expo-localization'

import id from '@/config/translations/resources/id.json'
import en from '@/config/translations/resources/en.json'

export const internationalization = i18n
    .use({
        type: 'languageDetector',
        async: true,
        detect: (callback: (lang: string) => void) => {
            const locales = getLocales();
            if (locales.length > 0 && locales[0].languageCode) {
                callback(locales[0].languageCode);
            }
        },
        init: () => {},
        cacheUserLanguage: () => {},
    })
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            id,
            en,
        },
        defaultNS: "general",
        debug: false,
        fallbackLng: "id",
        interpolation: {
            escapeValue: false,
        },
    });

export default internationalization
