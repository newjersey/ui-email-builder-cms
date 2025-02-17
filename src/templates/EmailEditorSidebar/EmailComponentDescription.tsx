import React, { FC } from 'react'
import { Link } from 'gatsby'
import { EmailParts } from 'src/appTypes'

interface Props {
  emailComponent: EmailParts.Base.Part<EmailParts.Kinds.Component>
}

export const EmailComponentDescription: FC<Props> = ({ emailComponent }) => {
  switch (emailComponent.kind) {
    case 'Name':
      return (
        <p className="description">
          Adding a name is highly encouraged. Avoid using "Dear" before the name
        </p>
      )
    case 'Banner':
    case 'StateSeal':
    case 'Disclaimer':
      return (
        <p className="description">
          Edit this in <Link to="/settings/email">Settings</Link>
        </p>
      )
    case 'Header':
    case 'Body':
    case 'Footer':
      return null
  }
}
