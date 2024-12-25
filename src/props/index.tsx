import { ContactLiteral, HomeLiteral, Information, Option, Preference, ProjectLiteral, Projects, Skill, SkillLiteral, SkillTable, TranslationLiteral, User, UserLiteral } from "../types"

export type NavegatorProps = {
    readonly preference: Preference, 
    readonly translationLiteral: TranslationLiteral | undefined ,
    readonly changeLang: (lang:string) => void,
    readonly changeThemeMode: (mode:boolean) => void
}

export type WrapperProps = {
    readonly translationLiteral: TranslationLiteral,
    readonly information: Information,
    readonly preference: Preference,
}

export type HomeProps = {
    readonly trans: HomeLiteral,
    readonly user: User
}

export type SkillsProps = {
    readonly trans: SkillLiteral,
    readonly skills: Array<Skill>,
    readonly isDark: boolean
}

export type SkillsTableProps = {
    readonly trans: SkillTable,
    readonly categories: Array<Option>
    readonly skills: Array<Skill>
}

export type ContactProps = {
    readonly user: User,
    readonly trans: ContactLiteral
}

export type UserProps = {
    readonly trans: UserLiteral
}

export type ProjectProps = {
    readonly projects: Array<Projects>,
    readonly trans: ProjectLiteral
}