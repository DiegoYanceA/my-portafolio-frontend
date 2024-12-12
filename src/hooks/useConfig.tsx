import { useEffect, useState } from "react";
import type { Config } from "../types"

export const useConfig = () => {
    const CONFIG_NAME_LOCALSTORAGE = "config";

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await fetch(`./information.json`);
                const user = await response.json();
                setConfig(prevConfig => ({
                    ...prevConfig,
                    user: user
                }))
            } catch(e: unknown) {
                if (e instanceof Error) {
                    console.error(e.message);
                } else {
                    console.error("Unknown error");
                }
            }
        };
      
        loadUser();
        document.documentElement.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease');
      }, []);

    const initialConfig = (): Config => {
        const localStorageConfig = localStorage.getItem(CONFIG_NAME_LOCALSTORAGE)
        const preference = localStorageConfig ? JSON.parse(localStorageConfig) :
            {
                lang: navigator.language.split("-")[0],
                dark: window.matchMedia('(prefers-color-scheme: dark)').matches
            }
            
        document.documentElement.classList.toggle("dark", preference.dark);
        document.documentElement.classList.toggle("light", !preference.dark);
        return {
            user: undefined,
            translationLiteral: undefined,
            preference: preference
        };
    }

    //State
    const [config, setConfig] = useState(initialConfig)

    useEffect(() => {
        localStorage.setItem(CONFIG_NAME_LOCALSTORAGE, JSON.stringify(config.preference));
        document.documentElement.classList.toggle("dark", config.preference.dark);
        document.documentElement.classList.toggle("light", !config.preference.dark);
    }, [config.preference.dark])

    useEffect(() => {
        localStorage.setItem(CONFIG_NAME_LOCALSTORAGE, JSON.stringify(config.preference));
        const loadTranslations = async () => {
            try {
                const response = await fetch(`/locals/${config.preference.lang}.json`);
                const translationLiteral = await response.json();
                setConfig(prevConfig => ({
                    ...prevConfig,
                    translationLiteral: translationLiteral
                }))
            } catch(e: unknown) {
                if (e instanceof Error) {
                    console.error(e.message);
                } else {
                    console.error("Unknown error");
                }
            }
        };
      
        loadTranslations();
        
    }, [config.preference.lang])

    function changeThemeMode(isDark:boolean) {
        console.log(config)
        setConfig({
            ...config,
            preference: {
                ...config.preference,
                dark: isDark
            }
        })
    }

    function changeLang(lang:string) {
        setConfig({
            ...config,
            preference: {
                ...config.preference,
                lang: lang
            }
        })
    }

    return {
        config,
        changeThemeMode,
        changeLang
    }
}