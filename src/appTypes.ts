export type ID = string | number

export const EmailTemplateComponentsMapping = {
  Banner: [],
  Body: [
    'Intro',
    'RulesRightsRegulations',
    'Status',
    'SupplementalContent',
    'Directive',
    'LoginDetails',
    'BenefitAmount',
  ],
  Footer: ['AdditionalContent'],
  Header: ['Title', 'ProgramName', 'DepartmentSeal'],
  Name: [],
  Disclaimer: [],
  StateSeal: [],
} as const

export namespace EmailTemplate {
  type EmailTemplateComponentsMappingType = typeof EmailTemplateComponentsMapping

  export type ComponentKind = keyof EmailTemplateComponentsMappingType
  export type SubComponentKind<T extends ComponentKind> =
    EmailTemplateComponentsMappingType[T][number]

  export interface SubComponent<T extends ComponentKind> {
    kind: SubComponentKind<T>
    description?: string
    required?: boolean
  }

  export interface Component<T extends ComponentKind = ComponentKind> {
    kind: T
    description?: string
    required?: boolean
    subComponents?: SubComponentKind<T> extends any ? SubComponent<T>[] : never
  }

  export interface Config {
    name: string
    description?: string
    components?: Component[]
  }
}
