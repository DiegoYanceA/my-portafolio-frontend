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

export type Sector = {
    title: string,
    id: number
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

export type ProjectLiteral = Literal & {
    sector: Array<Sector>,
    openCard: string,
    closeCard: string
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