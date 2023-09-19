import React, { FC } from 'react'
import type { EmailTemplateComponentItem, ID } from 'src/appTypes'
import { HeaderInput } from './HeaderInput'
import { FooterInput } from './FooterInput'

interface Props {
  copyId: ID
  emailTemplateComponentItem: EmailTemplateComponentItem
}

export const EmailTemplateFormComponent: FC<Props> = ({ copyId, emailTemplateComponentItem }) => {
  const { component, description } = emailTemplateComponentItem

  switch (component) {
    case 'Header':
      return <HeaderInput copyId={copyId} description={description} />
    case 'Footer':
      return <FooterInput copyId={copyId} description={description} />
  }
}