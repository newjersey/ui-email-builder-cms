import React, { FC } from 'react'
import { EmailSubComponentProps } from '../EmailTemplateSubComponents/shared'
import { Title } from '../EmailTemplateSubComponents/Title'
import { useShouldShowEmailSubComponent } from '../ShouldShowEmailPart'
import { ProgramName } from '../EmailTemplateSubComponents/ProgramName'
import { AdditionalContent } from '../EmailTemplateSubComponents/AdditionalContent'
import { Intro } from '../EmailTemplateSubComponents/Intro'
import { Status } from '../EmailTemplateSubComponents/Status'
import { SupplementalContent } from '../EmailTemplateSubComponents/SupplementalContent'
import { Directive } from '../EmailTemplateSubComponents/Directive'
import { RulesRightsRegulations } from '../EmailTemplateSubComponents/RulesRightsRegulations'
import { LoginDetails } from '../EmailTemplateSubComponents/LoginDetails'
import { DepartmentSeal } from '../EmailTemplateSubComponents/DepartmentSeal'
import { BenefitAmount } from '../EmailTemplateSubComponents/BenefitAmount'

export const EditEmailSubComponent: FC<EmailSubComponentProps> = (props) => {
  const shouldShow = useShouldShowEmailSubComponent(props.componentId, props.id)

  if (shouldShow.off) return null

  switch (props.emailSubComponent.kind) {
    case 'AdditionalContent':
      return <AdditionalContent {...props} />
    case 'Title':
      return <Title {...props} />
    case 'ProgramName':
      return <ProgramName {...props} />
    case 'Intro':
      return <Intro {...props} />
    case 'BenefitAmount':
      return <BenefitAmount {...props} />
    case 'RulesRightsRegulations':
      return <RulesRightsRegulations {...props} />
    case 'Status':
      return <Status {...props} />
    case 'SupplementalContent':
      return <SupplementalContent {...props} />
    case 'Directive':
      return <Directive {...props} />
    case 'LoginDetails':
      return <LoginDetails {...props} />
    case 'DepartmentSeal':
      return <DepartmentSeal {...props} />
    default:
      console.warn(`SubComponent (${props.emailSubComponent.kind}) not implemented`, props)
  }
}
