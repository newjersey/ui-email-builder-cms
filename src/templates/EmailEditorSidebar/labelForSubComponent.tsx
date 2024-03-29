import { EmailTemplate } from 'src/appTypes'

export const labelForSubComponent = (subComponentKind: EmailTemplate.SubComponentKind): string => {
  switch (subComponentKind) {
    case 'AdditionalContent':
      return 'Additional Content'
    case 'DateRange':
      return 'Date Range'
    case 'DepartmentSeal':
      return 'Department Seal'
    case 'LoginDetails':
      return 'Login Support'
    case 'SupplementalContent':
      return 'Supplemental Content'
    case 'ProgramName':
      return 'Program Name'
    case 'RulesRightsRegulations':
      return 'What else should they know?'
    default:
      return subComponentKind
  }
}
