import React, { FC } from 'react'
import { Header } from '../EmailTemplateComponents/Header'
import { Footer } from '../EmailTemplateComponents/Footer'
import { Banner } from '../EmailTemplateComponents/Banner'
import { Name } from '../EmailTemplateComponents/Name'
import { Body } from '../EmailTemplateComponents/Body'
import { Disclaimer } from '../EmailTemplateComponents/Disclaimer'
import { StateSeal } from '../EmailTemplateComponents/StateSeal'
import { EmailComponentProps } from '../EmailTemplateComponents/shared'
import { useShouldShowEmailPart } from '../ShouldShowEmailPart'
import { EmailTemplate } from 'src/appTypes'

export const EditEmailComponent: FC<EmailComponentProps<EmailTemplate.ComponentKind>> = ({
  emailComponent,
  ...props
}) => {
  const shouldShow = useShouldShowEmailPart(emailComponent.id)

  if (shouldShow.off) return null

  switch (emailComponent.kind) {
    case 'Header':
      return (
        <Header
          {...props}
          emailComponent={emailComponent as EmailTemplate.UniqueComponent<'Header'>}
        />
      )
    case 'Footer':
      return (
        <Footer
          {...props}
          emailComponent={emailComponent as EmailTemplate.UniqueComponent<'Footer'>}
        />
      )
    case 'Banner':
      return (
        <Banner
          {...props}
          emailComponent={emailComponent as EmailTemplate.UniqueComponent<'Banner'>}
        />
      )
    case 'Name':
      return (
        <Name {...props} emailComponent={emailComponent as EmailTemplate.UniqueComponent<'Name'>} />
      )
    case 'Body':
      return (
        <Body {...props} emailComponent={emailComponent as EmailTemplate.UniqueComponent<'Body'>} />
      )
    case 'Disclaimer':
      return (
        <Disclaimer
          {...props}
          emailComponent={emailComponent as EmailTemplate.UniqueComponent<'Disclaimer'>}
        />
      )
    case 'StateSeal':
      return (
        <StateSeal
          {...props}
          emailComponent={emailComponent as EmailTemplate.UniqueComponent<'StateSeal'>}
        />
      )
    default:
      console.warn(`Component (${emailComponent.kind}) not implemented`, {
        ...props,
        emailComponent,
      })
  }
}
