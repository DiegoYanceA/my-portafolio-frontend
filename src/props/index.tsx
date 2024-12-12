import { Preference, TranslationLiteral, User } from "../types"

export type NavegatorProps = {
    preference: Preference | undefined, 
    translationLiteral: TranslationLiteral | undefined,
    changeLang: (lang:string) => void,
    changeThemeMode: (mode:boolean) => void
}

export type UserProps = {
    translationLiteral: TranslationLiteral | undefined,
    user: User | undefined,
}