import { initReactI18next } from "react-i18next";

import i18n from "i18next";

// i18next t method can return a null value, needs to be prevented.
declare module "i18next" {
    interface CustomTypeOptions {
        returnNull: false;
    }
}

i18n.use(initReactI18next)
    .init({
        resources: {
            fr: {
                translation: {}
            }
        },
        returnNull: false,
        lng: "fr",
        interpolation: {
            escapeValue: false
        },
        react: {
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ["br", "strong", "i", "ul", "li", "p", "s", "u"]
        }
    })
    .then();

export default i18n;
