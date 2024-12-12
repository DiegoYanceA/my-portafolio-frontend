export type Config = {
    preference: Preference,
    user: User | undefined,
    translationLiteral: TranslationLiteral | undefined
}

export type Preference = {
    lang: string,
    dark: boolean
}


export type User = {
    title: string,
    linkedin: string,
    github: string
}

export type TranslationLiteral = {
    home: HomeLiteral,
    experience: ExperienceLiteral,
    project: ProjectLiteral,
    skill: SkillLiteral,
    contact: ContactLiteral
}

type Literal = {
    text: string,
    description: string
}

type HomeLiteral = Literal & {
}

type ExperienceLiteral = Literal & {
}

type ProjectLiteral = Literal & {
}

type SkillLiteral = Literal & {
}

type ContactLiteral = Literal & {
}