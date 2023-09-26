import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Colors, Font } from './styles'
import { EditableElement } from 'src/ui/EditableElement'

export const Label: FC<EmailSubComponentProps> = ({ id, componentId }) => {
  const { isActive, focus } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [label, setLabel] = useEmailPartsContentForSubComponent(componentId, id, '')

  return (
    <tr>
      <td onClick={focus}>
        <EditableElement
          defaultValue="Label"
          element="div"
          onChange={setLabel}
          style={styles}
          value={label}
        />
      </td>
    </tr>
  )
}

const styles: CSSProperties = {
  backgroundColor: '#CCBDDF',
  borderRadius: 3,
  color: Colors.black,
  fontFamily: Font.family.default,
  fontSize: 13,
  fontWeight: Font.weight.bold,
  lineHeight: '150%',
  padding: '5px 10px',
  display: 'inline-flex',
  alignItems: 'center',
}