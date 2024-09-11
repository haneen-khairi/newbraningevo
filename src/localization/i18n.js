import i18next from "i18next"
import { initReactI18next } from 'react-i18next'
import enJSON from "./en.json"
import arJSON from "./ar.json"

i18next.use(initReactI18next).init({
    fallbackLng: 'en',
    resources: {
        en: {
            translation: enJSON
        },
        ar: {
            translation: arJSON
        }
    },
    lng: localStorage.getItem('lang') || 'ar',
})

export default i18next