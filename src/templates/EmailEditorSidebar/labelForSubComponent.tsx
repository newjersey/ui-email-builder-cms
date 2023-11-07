import { EmailTemplate } from 'src/appTypes'

export const labelForSubComponent = (subComponentKind: EmailTemplate.SubComponentKind): string => {
  switch (subComponentKind) {
    case 'AdditionalContent':
      return 'Additional Content'
    case 'DepartmentSeal':
      return 'Department Seal'
    case 'SupplementalContent':
      return 'Supplemental Content'
    case 'ProgramName':
      return 'Program Name'
    case 'RulesRightsRegulations':
      return 'Rules, Rights, and Regulations'
    case 'BenefitAmount':
      return 'Benefit Amount'
    default:
      return subComponentKind
  }
}
