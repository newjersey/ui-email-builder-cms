import React, { FC } from 'react'
import { Heading, Paragraph } from 'src/ui/Layout'
import { EmailBlock } from 'src/ui'
import {
  useDisclaimerValue,
  styles as disclaimerStyles,
} from 'src/templates/EmailTemplateComponents/Disclaimer'
import { Spacing } from 'src/templates/styles'
import { RichTextEditableElement } from '../RichTextEditableElement'

export const EditDisclaimer: FC = () => {
  const [disclaimer, setDisclaimer] = useDisclaimerValue()

  return (
    <form className="edit-disclaimer">
      <Heading element="h2" subheading>
        Disclaimer
      </Heading>
      <Paragraph>
        Below every email, there is a disclaimer that is used for confidentiality purposes as well
        as security purposes.
      </Paragraph>
      <EmailBlock.Table elements={['row']} className="desktop" maxWidth={Spacing.layout.maxWidth}>
        <RichTextEditableElement
          label="Disclaimer"
          element="td"
          value={disclaimer}
          onValueChange={setDisclaimer}
          style={disclaimerStyles}
        />
      </EmailBlock.Table>
    </form>
  )
}
