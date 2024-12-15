export type Config = {
    preference: Preference,
    information: Information | undefined,
    translationLiteral: TranslationLiteral | undefined
}

export type Preference = {
    lang: string,
    dark: boolean
}

export type Information = {
    user: User,
    skills: Array<Skill>
}

export type User = {
    title: string,
    linkedin: string,
    github: string,
    email: string
}

export type Skill = {
    id: number,
    title: string,
    stacks: Array<Stack> | undefined
}

export type Stack = {
    title: string,
    year: number,
    month: number,
    experience: boolean
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
    experience: string,
    proficiency: string,
    skills: Array<Skill> | undefined
}

type ContactLiteral = Literal & {
}