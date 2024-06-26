import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from '../EmailTemplateSubComponents/shared'
import {
  BoxColor,
  BoxColorConfigs,
  EditableElement,
  EmailBlock,
  RichTextEditableElement,
  UswdsIcon,
} from 'src/ui'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Borders, Spacing, StyleDefaults, Text, Font, SpacingCell } from '../styles'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { EmailTemplate, InformationalBoxValue } from 'src/appTypes'

const defaultValue: InformationalBoxValue = {
  boxColor: BoxColor.BenefitBlue,
  icon: 'LockOpen',
  title: 'Application confirmation number',
  description: [{ type: 'paragraph', children: [{ text: 'Confirmation number: 123456789' }] }],
  showSupportiveInformation: true,
  supportiveInformation: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a tellus nec eros placerat ornare at sed ante. Duis enim quam, auctor quis congue eget, commodo eu urna. Donec laoreet a dui consequat sollicitudin. Aliquam et dapibus ex, at malesuada tellus.',
          italic: true,
        },
      ],
    },
  ],
}

export const useInformationalBoxValue = (emailSubComponent: EmailTemplate.InformationalBox) => {
  return useEmailPartsContentFor(emailSubComponent, defaultValue)
}

const { Row, Cell } = EmailBlock

export const InformationalBox: FC<EmailSubComponentProps<'InformationalBox'>> = ({
  emailSubComponent,
}) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useInformationalBoxValue(emailSubComponent)
  const { previewRef, scrollSidebar } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)

  const boxColorConfig = BoxColorConfigs[value.boxColor]

  return (
    <Row
      className="informational-box"
      onClick={(event) => {
        activate(event)
        scrollSidebar()
      }}
      onFocus={(event) => {
        activate(event)
        scrollSidebar()
      }}
      elements={[
        'cell',
        'table',
        'row',
        { part: 'cell', style: styles.outerCell, className: StyleDefaults.layout.wide },
        'table',
      ]}
    >
      <Row
        elements={[
          {
            part: 'cell',
            style: {
              ...styles.innerCell,
              backgroundColor: boxColorConfig.backgroundColor,
              borderLeft: Borders.large(boxColorConfig.accentColor),
            },
          },
          'table',
          'row',
        ]}
      >
        <Cell style={styles.iconContainer} align="left">
          <UswdsIcon icon={value.icon} />
        </Cell>
        <Cell style={{ width: '100%' }} elements={['table']}>
          <Row>
            <Cell>
              <EditableElement
                ref={previewRef}
                aria-level={2}
                element="div"
                value={value.title}
                label="Informational box title"
                onValueChange={(title) => setValue({ ...value, title })}
                role="heading"
                style={styles.title}
              />
            </Cell>
          </Row>
          <Row>
            <RichTextEditableElement
              element="td"
              value={value.description}
              label="Informational box content"
              onValueChange={(description) => setValue({ ...value, description })}
              style={styles.description}
            />
          </Row>
        </Cell>
      </Row>
      {value.showSupportiveInformation && (
        <>
          <Row>
            <SpacingCell size="medium" />
          </Row>
          <Row>
            <RichTextEditableElement
              element="td"
              label="Supportive information"
              value={value.supportiveInformation}
              onValueChange={(supportiveInformation) =>
                setValue({ ...value, supportiveInformation })
              }
              style={styles.supportiveInformation}
            />
          </Row>
        </>
      )}
    </Row>
  )
}

const styles = {
  outerCell: {
    ...StyleDefaults.inline.colors,
    fontFamily: Font.family.default,
  } as CSSProperties,
  innerCell: {
    paddingTop: Spacing.informationalBox.vertical,
    paddingBottom: Spacing.informationalBox.vertical,
    paddingLeft: Spacing.informationalBox.horizontal.left,
    paddingRight: Spacing.informationalBox.horizontal.right,
  } as CSSProperties,
  iconContainer: {
    paddingRight: Spacing.size.medium,
  } as CSSProperties,
  title: {
    ...Text.header.h3.bold,
    paddingBottom: Spacing.size.medium,
    lineHeight: '1.2',
  } as CSSProperties,
  description: {
    ...Text.body.main.regular,
  } as CSSProperties,
  supportiveInformation: {
    ...Text.body.tertiary.regular,
  } as CSSProperties,
}
