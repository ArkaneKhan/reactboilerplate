import I18n from 'i18n-js'; // You can import i18n-js as well if you don't want the app to set default locale from the device locale.
import en from '../Localization/Translations/en';
import es from '../Localization/Translations/es';

I18n.fallbacks = true; // If an English translation is not available in en.js, it will look inside hi.js
//I18n.missingBehaviour = 'guess'; // It will convert HOME_noteTitle to "HOME note title" if the value of HOME_noteTitle doesn't exist in any of the translation files.
I18n.defaultLocale = 'en'; // If the current locale in device is not en or hi
I18n.locale = 'en'; // If we do not want the framework to use the phone's locale by default

I18n.translations = {
  en,
  es
};

export const setLocale = (locale) => {
  I18n.locale = locale;
};

export let getCurrentLocale = () => I18n.locale; // It will be used to define intial language state in reducer.

/* translateHeaderText:
 screenProps => coming from react-navigation (defined in app.container.js)
 langKey => will be passed from the routes file depending on the screen.(We will explain the usage later int the coming topics)
*/
// export const translateHeaderText = (langKey) => ({screenProps}) => {
//   const title = I18n.translate(langKey, screenProps.language);
//   return {title};
// };
export const translateHeaderText = (langKey, type) => {
  const title = I18n.translate(langKey, type);
  return title;
};
export default I18n.translate.bind(I18n);

// import React, { Component } from 'react';
// import I18n from 'i18n-js';

// // Import all locales
// import en from './Translations/en.json';
// import fr from './Translations/fr.json';
// class Language extends Component {

// }
// // Should the app fallback to English if user locale doesn't exists
// I18n.fallbacks = true;

// // Define the supported translations
// I18n.translations = {
//   en,
//   fr
// };

// I18n.locale = 'fr'


// // The method we'll use instead of a regular string
// export function strings(name, params = {}) {
//   return I18n.t(name, params);
// };

// export default I18n;

// // const currentLocale = I18n.currentLocale();

// // Is it a RTL language?
// // export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

// // Allow RTL alignment in RTL languages
// // ReactNative.I18nManager.allowRTL(isRTL);

// //------------------------------------------------------------

// // import RNLanguages from 'react-native-languages';
// // import i18n from 'i18n-js';

// // import en from './Translations/en.json';
// // import fr from './Translations/fr.json';
// // // import de from './translations/de.json';

// // i18n.locale = RNLanguages.language;
// // i18n.fallbacks = true;
// // i18n.translations = { en, fr };

// // export default i18n;