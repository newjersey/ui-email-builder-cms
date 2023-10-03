import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { EmailTable, TableAndCell } from 'src/ui/EmailTable'
import { EditableElement } from 'src/ui/EditableElement'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { DefaultStyles, Font, Spacing } from '../styles'

const defaultValue = {
  title: 'Supplemental Content Title',
  description:
    'Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
}

export const SupplementalContent: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue] = useEmailPartsContentForSubComponent(componentId, id, defaultValue)

  return (
    <tr onClick={activate}>
      <td style={outerCellStyles}>
        <TableAndCell>
          <EmailTable>
            <tr>
              <EditableElement
                data-testid="body-supplemental-content-title"
                element="td"
                value={value.title}
                defaultValue={defaultValue.title}
                onValueChange={(title) => setValue({ ...value, title })}
                style={titleStyles}
              />
            </tr>
            <tr>
              <EditableElement
                data-testid="body-supplemental-content-description"
                element="td"
                value={value.description}
                defaultValue={defaultValue.description}
                onValueChange={(description) => setValue({ ...value, description })}
                style={descriptionStyles}
              />
            </tr>
          </EmailTable>
        </TableAndCell>
      </td>
    </tr>
  )
}

const outerCellStyles: CSSProperties = {
  ...DefaultStyles,
  paddingBottom: Spacing.size.medium,
  paddingTop: Spacing.size.medium,
}

const titleStyles: CSSProperties = {
  fontSize: Font.size.large,
  fontWeight: Font.weight.bold,
  paddingBottom: Spacing.size.small,
}
const descriptionStyles: CSSProperties = {
  lineHeight: '22px',
}