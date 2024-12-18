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
    stacks: Array<Stack>
}

export type Stack = {
    title: string,
    year: number,
    month: number,
    experience: boolean,
    logo: string
}

export type SkillStackTable = Stack & {
    category: string
}

export type TranslationLiteral = {
    home: HomeLiteral,
    user: UserLiteral,
    project: ProjectLiteral,
    skills: SkillLiteral,
    contact: ContactLiteral,
    footer: FooterLiteral
}

export type Snackbard = {
    copy: string
}

type Table = {
    header: Array<string>,
    rowsPerPage: number | undefined,
}

export type SkillTable = Table & {
    experienceLabel: string,
    experienceOptions: Array<string>,
    categoryLabel: string,
    nameLabel: string,
    yearsLabel: string,
}
type Literal = {
    text: string,
    description: string
}

type HomeLiteral = Literal & {
}

type UserLiteral = Literal & {
    hackaton: string, 
    bachelor: string
}

type ProjectLiteral = Literal & {
}

type SkillLiteral = Literal & {
    experience: string,
    proficiency: string,
    list: Array<Skill> | undefined,
    table: SkillTable,
    openGraphic: string,
    closeGraphic: string,
}

type ContactLiteral = Literal & {
    snackbard: Snackbard
}

type FooterLiteral = Literal & {
}