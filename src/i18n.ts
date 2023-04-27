import Vue from "vue";
import VueI18n, { LocaleMessages } from "vue-i18n";
import en from "./lang/en.js"; // Import your English language file
import tr from "./lang/tr.js"; // Import your Turkish language file
import ru from "./lang/ru.js"; // Import your Russian language file

Vue.use(VueI18n);

const messages: LocaleMessages = {
  en: en,
  tr: tr,
  ru: ru,
};

const i18n = new VueI18n({
  locale: "en", // Set the default language
  fallbackLocale: "en",
  messages,
});

export default i18n;
