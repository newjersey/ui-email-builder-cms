import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Colors, Font } from './styles'
import { EditableElement } from 'src/ui/EditableElement'

export const AdditionalContent: FC<EmailSubComponentProps> = ({ id, componentId }) => {
  const { isActive, focus } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue] = useEmailPartsContentForSubComponent(componentId, id, '')

  return (
    <tr>
      <td onClick={focus}>
        <EditableElement
          defaultValue="Additional Content"
          element="div"
          onChange={setValue}
          style={styles}
          value={value}
        />
      </td>
    </tr>
  )
}

const styles: CSSProperties = {}