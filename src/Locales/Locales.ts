import DefaultLocales from "./Default.locales";

/**
 * Object representing variations of a key in multiple languages
 */
export interface LocaleKey {
    [index: string]: string | undefined;

    en: string;
    de?: string;
    fr?: string;
}
/**
 * A dictionary representing all locales
 */
export interface Locales {
    [key: string]: LocaleKey
}

export interface LocalesHelperInterface {
    dictionary: Locales;
}

/**
 * A helper class for translating a plugin.
 */
export class LocalesHelper implements LocalesHelperInterface {
    dictionary: Locales;

    constructor(dictionary: Locales) {
        this.dictionary = dictionary
    }
    /**
     * 
     * @param window The global window object
     */
    static getTranslations(window: any = globalThis) {
        let lang = "en"
        if (typeof window.ioApp == "object") {
            lang = window.ioApp.lang
        }
        let unprocessed: Locales = window.ctoUI_Locales

        if (typeof unprocessed == "undefined") {
            unprocessed = {}
        }

        const translations = Object.fromEntries(Object.entries({...DefaultLocales, ...unprocessed} as Locales).map(line => {
            let value = line[1][lang.split("-")[0] as string]
            if (typeof value != "string") {
                value = line[1]["en"]
            }
            return [
                line[0],
                value
            ]
        }))

        return (index: string) => {
            return translations[index] ?? index
        }
    }
}