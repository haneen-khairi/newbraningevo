import { useTranslation } from 'react-i18next';

export function useUserLanguage() {
    const { i18n } = useTranslation();
    return i18n.language;
}