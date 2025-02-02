import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { useIsCurrentlyActiveEmailComponent } from '../CurrentlyActiveEmailPart'
import { EmailBlock, EditableElement } from 'src/ui'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Font, StyleDefaults, Text } from '../styles'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'

const { Row } = EmailBlock

export const Name: FC<EmailComponentProps<'Name'>> = ({ emailComponent, readOnly }) => {
  const { activate } = useIsCurrentlyActiveEmailComponent(emailComponent)
  const [value, setValue] = useEmailPartsContentFor(emailComponent)
  const { scrollSidebar, previewRef } = useSyncSidebarAndPreviewScroll(emailComponent.id)
  return (
    <Row className="name">
      <EditableElement
        ref={previewRef}
        element="td"
        className={StyleDefaults.layout.narrow}
        label="Recipient's name"
        onClick={(event) => {
          activate(event)
          scrollSidebar()
        }}
        onFocus={(event) => {
          activate(event)
          scrollSidebar()
        }}
        onValueChange={(name) => setValue({ ...value, name })}
        readOnly={readOnly}
        style={styles}
        value={value.name}
      />
    </Row>
  )
}

const styles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  ...Text.body.main.regular,
  fontFamily: Font.family.serifMonospace,
  fontWeight: Font.weight.boldLight,
  textTransform: 'uppercase',
}
