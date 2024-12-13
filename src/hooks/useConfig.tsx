import { useEffect, useState } from "react";
import type { Config, Preference } from "../types"

export const useConfig = () => {
    const CONFIG_NAME_LOCALSTORAGE = "config";

    useEffect(() => {

        // Load information about user
        changeLang(config.preference.lang);
        loadUser();
        
      }, []);

    const initialConfig = (): Config => {
        const localStorageConfig = localStorage.getItem(CONFIG_NAME_LOCALSTORAGE);
        
        let preference: Preference;
        
        if(localStorageConfig != null) {
             preference = JSON.parse(localStorageConfig);
            if(preference.lang == null) {
                preference.lang = navigator.language.split("-")[0];
            }

            if(preference.dark == null) {
                preference.dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
  
        } else {
            preference = {
                dark: window.matchMedia('(prefers-color-scheme: dark)').matches,
                lang: navigator.language.split("-")[0]
            };
        }

        document.documentElement.classList.toggle("dark", preference.dark);
        document.documentElement.classList.toggle("light", !preference.dark);
       
        return {
            information: undefined,
            translationLiteral: undefined,
            preference: preference
        };
        
    }

    //State
    const [config, setConfig] = useState(initialConfig)

    const loadUser = async () => {
        try {
            const response = await fetch(`./information.json`);
            const user = await response.json();
            setConfig(prevConfig => ({
                ...prevConfig,
                information: user
            }))

            document.documentElement.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease');
        } catch(e: unknown) {
            if (e instanceof Error) {
                console.error(e.message);
            } else {
                console.error("Unknown error");
            }
        }
    };

    const changeLang = async (lang:string) => {
        try {
            const response = await fetch(`/locals/${lang}.json`);
            const translationLiteral = await response.json();
            setConfig(prevConfig => {
                const newConfig = {
                    ...prevConfig,
                    preference: {
                        ...prevConfig.preference,
                        lang: lang
                    },
                    translationLiteral: translationLiteral
                }
                localStorage.setItem(CONFIG_NAME_LOCALSTORAGE, JSON.stringify(newConfig.preference));
                return newConfig;
            })
        } catch(e: unknown) {
            if (e instanceof Error) {
                console.error(e.message);
            } else {
                console.error("Unknown error");
            }
        }
    }

    const changeThemeMode = (isDark:boolean) => {
        setConfig((prevConfig) => {
            const newConfig = {
                ...prevConfig,
                preference: {
                    ...prevConfig.preference,
                    dark: isDark,
                },
            };  

            localStorage.setItem(CONFIG_NAME_LOCALSTORAGE, JSON.stringify(newConfig.preference));
            document.documentElement.classList.toggle("dark", isDark);
            document.documentElement.classList.toggle("light", !isDark);
            return newConfig;
        });

    }

    return {
        config,
        changeThemeMode,
        changeLang
    }
}