import React, {
  CSSProperties,
  JSX,
  ReactNode,
  TableHTMLAttributes,
  forwardRef,
  useState,
} from 'react'
import { Text } from 'slate'
import { RichTextEditor, RichTextElement, RichTextLeaf, RichTextValue } from './RichTextEditor'

export interface RichTextEditableElementProps {
  className?: string
  element: keyof JSX.IntrinsicElements
  label: string
  onClick?: TableHTMLAttributes<HTMLOrSVGElement>['onClick']
  onFocus?: TableHTMLAttributes<HTMLOrSVGElement>['onFocus']
  onValueChange: (value: RichTextValue) => void
  readonly?: boolean
  value: RichTextValue
  style?: CSSProperties
}

export const RichTextEditableElement = forwardRef<any, RichTextEditableElementProps>(
  ({ element: Element, label, onFocus, onValueChange, value, readonly, style, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    if (isFocused) {
      return (
        <Element style={{ ...style, position: 'relative' }} {...props}>
          <RichTextEditor
            autoFocus
            label={label}
            onValueChange={onValueChange}
            onEditorBlur={() => setIsFocused(false)}
            value={value}
          />
        </Element>
      )
    } else {
      return (
        <Element
          aria-label={label}
          tabIndex={-1}
          style={style}
          onFocus={(event) => {
            onFocus && onFocus(event)
            if (!readonly) {
              setIsFocused(true)
            }
          }}
          {...({ ref } as any)}
          {...props}
        >
          {displayRichText(value)}
        </Element>
      )
    }
  },
)

const displayRichText = (value: RichTextValue): ReactNode => {
  return value.map((node, i) => {
    if (Text.isText(node)) {
      return (
        <RichTextLeaf key={i} leaf={node}>
          {node.text || <>&nbsp;</>}
        </RichTextLeaf>
      )
    }
    return (
      <RichTextElement key={i} element={node}>
        {displayRichText(node.children)}
      </RichTextElement>
    )
  })
}