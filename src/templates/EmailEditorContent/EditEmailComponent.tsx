import React, { FC } from 'react'
import { Header } from '../EmailTemplateComponents/Header'
import { Footer } from '../EmailTemplateComponents/Footer'
import { Banner } from '../EmailTemplateComponents/Banner'
import { Name } from '../EmailTemplateComponents/Name'
import { EmailComponentProps } from '../EmailTemplateComponents/shared'
import { useShouldShowEmailComponent } from '../ShouldShowEmailPart'
import { Amount } from '../EmailTemplateComponents/Amount'

export const EditEmailComponent: FC<EmailComponentProps> = (props) => {
  const shouldShow = useShouldShowEmailComponent(props.id)

  if (!shouldShow.on) return null

  switch (props.emailComponent.kind) {
    case 'Amount':
      return <Amount {...props} />
    case 'Header':
      return <Header {...props} />
    case 'Footer':
      return <Footer {...props} />
    case 'Banner':
      return <Banner {...props} />
    case 'Name':
      return <Name {...props} />
    default:
      console.warn(`Component (${props.emailComponent.kind}) not implemented`, props)
  }
}
