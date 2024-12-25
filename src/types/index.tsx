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
    skills: Array<Skill>,
    projects: Array<Projects>
}

export type User = {
    title: string,
    linkedin: string,
    github: string,
    email: string,
}

export type Projects = {
    id: number,
    title: string,
    technologies: Array<string>,
    live: string,
    image: string,
    rol: string,
    sector: number
}

export type CardProject = Projects & {
    sectorName: string
}

export type Option = {
    text: string,
    id: number
}

export type Skill = {
    id: number,
    title: string,
    stacks: Array<Stack>
}

export type Stack = {
    id: number,
    title: string,
    year: number,
    month: number,
    experience: boolean,
    logo: string
}

export type StackTable = Stack & {
    category: string,
    idSkill: number
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
    header: Array<Option>
    footer: FooterTable
}

type FooterTable = {
    noRecords: string,
    showRows: string
}

export type SkillTable = Table & {
    experienceLabel: string,
    experienceOptions: Array<Option>,
    categoryLabel: string,
    nameLabel: string,
    yearsLabel: string
}
type Literal = {
    text: string,
    description: string
}

export type HomeLiteral = Literal & {
}

export type UserLiteral = Literal & {
    hackaton: string, 
    bachelor: string
}

export type ProjectLiteral = Literal & {
    sector: Array<Option>,
    openCard: string,
    closeCard: string,
    liveText: string,
    nameLabel: string,
    sectorLabel: string,
    noRecords: string
}

export type SkillLiteral = Literal & {
    experience: string,
    proficiency: string,
    categories: Array<Option>,
    table: SkillTable,
    openGraphic: string,
    closeGraphic: string,
}

export type ContactLiteral = Literal & {
    snackbard: Snackbard
}

export type FooterLiteral = Literal & {
}