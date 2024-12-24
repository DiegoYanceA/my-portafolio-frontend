import { ContactLiteral, HomeLiteral, Information, Preference, ProjectLiteral, Projects, Skill, SkillLiteral, SkillTable, TranslationLiteral, User, UserLiteral } from "../types"

export type NavegatorProps = {
    preference: Preference, 
    translationLiteral: TranslationLiteral ,
    changeLang: (lang:string) => void,
    changeThemeMode: (mode:boolean) => void
}

export type WrapperProps = {
    translationLiteral: TranslationLiteral,
    information: Information,
    preference: Preference,
}

export type HomeProps = {
    trans: HomeLiteral,
    user: User
}

export type SkillsProps = {
    trans: SkillLiteral,
    skills: Array<Skill>,
    isDark: boolean
}

export type SkillsTableProps = {
    trans: SkillTable,
    skills: Array<Skill>
}

export type ContactProps = {
    user: User,
    trans: ContactLiteral
}

export type UserProps = {
    trans: UserLiteral
}

export type ProjectProps = {
    projects: Array<Projects>,
    trans: ProjectLiteral
}