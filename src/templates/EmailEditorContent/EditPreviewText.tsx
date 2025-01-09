import React, { FC } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import './EditPreviewText.css'

interface Props {
  onChange: (value: string) => void
  value: string
  readOnly?: boolean
}

export const EditPreviewText: FC<Props> = ({ onChange, readOnly, value }) => {
  const headingId = 'edit-preview-text'
  const descriptionId = 'preview-text-description'
  const characterCountId = 'preview-text-character-count'

  return (
    <div className="edit-preview-text">
      <div className="edit-preview-text-heading-container">
        <h2 id={headingId}>Preview Text</h2>
        <VisuallyHidden>
          <p id={descriptionId}>80-120 characters is ideal</p>
        </VisuallyHidden>
      </div>
      <div className="edit-preview-text-text-area-container">
        <textarea
          aria-describedby={[descriptionId, characterCountId].join(' ')}
          aria-labelledby={headingId}
          aria-readonly={readOnly}
          readOnly={readOnly}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="This is the preview text that you can edit (80-120 characters is ideal). It gives insight into the email so that people will open it."
        />
        <p id={characterCountId}>
          {value.length}
          <VisuallyHidden>characters total</VisuallyHidden>
        </p>
      </div>
    </div>
  )
}
