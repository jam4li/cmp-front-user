import { createI18n, LocaleMessages } from 'vue-i18n';
import en from './lang/en'; // Import your English language file
import tr from './lang/tr'; // Import your Turkish language file
import ru from './lang/ru'; // Import your Russian language file

const messages: LocaleMessages = {
  en,
  tr,
  ru,
};

const i18n = createI18n({
  locale: 'en', // Set the default language
  fallbackLocale: 'en',
  messages,
});

export default i18n;
