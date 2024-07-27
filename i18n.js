import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr', // Langue par défaut si aucune n'est trouvée
    lng: 'fr', // Langue initiale
    resources: {
      en: {
        translation: require('./public/locales/en/translation.json')
      },
      fr: {
        translation: require('./public/locales/fr/translation.json')
      }
    },
    interpolation: {
      escapeValue: false // Réagir déjà s'échappe par défaut
    }
  });

export default i18n;
