import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EmailBlock, EditableElement, RichTextEditableElement } from 'src/ui'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Borders, Colors, Spacing, StyleDefaults, Text } from '../styles'
import { UswdsIcon } from 'src/ui'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { EmailTemplate, LoginDetailsValue, LoginDetailsVariant } from 'src/appTypes'

const DISPLAYED_HREF_MAX_WIDTH = 297

const { Row, Cell, Link } = EmailBlock

export const defaultLoginDetailsValue: LoginDetailsValue = {
  variant: LoginDetailsVariant.Details,
  // Details
  loginDetailsTitle: 'Login Details',
  usernameLabel: 'Your username is:',
  usernameValue: 'CAPTAIN AMERICA',
  resetPasswordMessage: [
    {
      type: 'paragraph',
      children: [
        { text: "If you're having trouble logging in, send a request to reset your password." },
      ],
    },
  ],
  button: 'Reset Password',
  buttonHref:
    'https://link.embedded-into-the-button-above.should-be-shown-here-in-order-to-give-an-alternative-way-to-access-a-link',
  resetPasswordDetails: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Your request may take up to 7-10 business days. An email will be sent to you when your password has been reset.',
          italic: true,
        },
      ],
    },
  ],
  loginDetailsIcon: 'Lock',
  // Information
  loginInformationTitle: 'Important Login Information',
  loginInformationDescription: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Login using the same Login ID and Password you used to file your claim.',
          bold: true,
        },
      ],
    },
  ],
  showLoginInformationBody: true,
  loginInformationBody: [
    {
      type: 'bulleted-list',
      children: [
        {
          type: 'list-item',
          children: [
            { text: 'If you do not have an account,', bold: true, italic: true },
            {
              text: ' create one here. After creating your account, return to this email and get started.',
              italic: true,
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            { text: 'Forget your username and password?', bold: true, italic: true },
            {
              text: ' Follow the links on the login page to help access your account.',
              italic: true,
            },
          ],
        },
      ],
    },
  ],
  loginInformationIcon: 'LockOpen',
}

export const useLoginDetailsValue = (emailSubComponent: EmailTemplate.LoginDetails) => {
  return useEmailPartsContentFor(emailSubComponent, defaultLoginDetailsValue)
}

export const LoginDetails: FC<EmailSubComponentProps<'LoginDetails'>> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useLoginDetailsValue(emailSubComponent)
  const { previewRef, scrollSidebar } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)
  const isDetails = value.variant === LoginDetailsVariant.Details
  const isInformation = value.variant === LoginDetailsVariant.Information

  return (
    <Row
      className="login-details"
      elements={[
        { part: 'cell', style: styles.outerContainer, className: StyleDefaults.layout.wide },
        {
          part: 'table',
          onClick: (event) => {
            activate(event)
            scrollSidebar()
          },
          onFocus: (event) => {
            activate(event)
            scrollSidebar()
          },
        },
        'row',
        { part: 'cell', style: styles.innerContainer },
        'table',
      ]}
    >
      <tr ref={previewRef} />
      <Row>
        <Cell style={styles.iconContainer}>
          {isDetails && <UswdsIcon icon={value.loginDetailsIcon} />}
          {isInformation && <UswdsIcon icon={value.loginInformationIcon} />}
        </Cell>
        {isDetails && (
          <EditableElement
            aria-level={2}
            element="td"
            onValueChange={(loginDetailsTitle) => setValue({ ...value, loginDetailsTitle })}
            label="Login details title"
            role="heading"
            style={styles.title}
            value={value.loginDetailsTitle}
          />
        )}
        {isInformation && (
          <EditableElement
            aria-level={2}
            element="td"
            onValueChange={(loginInformationTitle) => setValue({ ...value, loginInformationTitle })}
            label="Login information title"
            role="heading"
            style={styles.title}
            value={value.loginInformationTitle}
          />
        )}
      </Row>
      <Row condition={isDetails}>
        <Cell>{null}</Cell>
        <Cell elements={['table']}>
          <Row>
            <EditableElement
              element="td"
              onValueChange={(usernameLabel) => setValue({ ...value, usernameLabel })}
              label="Username label"
              style={styles.usernameLabel}
              value={value.usernameLabel}
            />
          </Row>
          <Row>
            <EditableElement
              element="td"
              onValueChange={(usernameValue) => setValue({ ...value, usernameValue })}
              label="Username value"
              style={styles.usernameValue}
              value={value.usernameValue}
            />
          </Row>
          <Row>
            <RichTextEditableElement
              element="td"
              onValueChange={(resetPasswordMessage) => setValue({ ...value, resetPasswordMessage })}
              label="Reset password message"
              style={styles.resetPasswordMessage}
              value={value.resetPasswordMessage}
            />
          </Row>
          <Row
            elements={[
              'cell',
              { part: 'table', width: 'unset', className: StyleDefaults.layout.button },
              'row',
              { part: 'cell', style: styles.button },
            ]}
          >
            <Link to={value.buttonHref}>
              <EditableElement
                element="span"
                onValueChange={(button) => setValue({ ...value, button })}
                label="Reset password button"
                style={styles.buttonText}
                value={value.button}
              />
            </Link>
          </Row>
          <Row
            className="displayed-href"
            elements={[
              'cell',
              { part: 'table', maxWidth: DISPLAYED_HREF_MAX_WIDTH },
              'row',
              { part: 'cell', style: styles.buttonHref },
            ]}
          >
            <Link to={value.buttonHref}>
              <EditableElement
                element="span"
                onValueChange={(buttonHref) => setValue({ ...value, buttonHref })}
                label="Reset password link"
                value={value.buttonHref}
              />
            </Link>
          </Row>
          <Row>
            <RichTextEditableElement
              element="td"
              onValueChange={(resetPasswordDetails) => setValue({ ...value, resetPasswordDetails })}
              label="Reset password details"
              style={styles.resetPasswordDetails}
              value={value.resetPasswordDetails}
            />
          </Row>
        </Cell>
      </Row>
      <Row condition={isInformation}>
        <Cell>{null}</Cell>
        <Cell elements={['table']}>
          <Row>
            <RichTextEditableElement
              element="td"
              label="Login information description"
              value={value.loginInformationDescription}
              onValueChange={(loginInformationDescription) =>
                setValue({ ...value, loginInformationDescription })
              }
              style={styles.loginInformationDescription}
            />
          </Row>
          <Row condition={value.showLoginInformationBody}>
            <RichTextEditableElement
              element="td"
              label="Login information content"
              value={value.loginInformationBody}
              onValueChange={(loginInformationBody) => setValue({ ...value, loginInformationBody })}
              style={styles.loginInformationBody}
            />
          </Row>
        </Cell>
      </Row>
    </Row>
  )
}

const styles = {
  outerContainer: {
    ...StyleDefaults.inline.colors,
  } as CSSProperties,
  innerContainer: {
    backgroundColor: Colors.alert.info.light,
    borderLeft: Borders.large(Colors.alert.info.dark),
    paddingTop: Spacing.informationalBox.vertical,
    paddingBottom: Spacing.informationalBox.vertical,
    paddingLeft: Spacing.informationalBox.horizontal.left,
    paddingRight: Spacing.informationalBox.horizontal.right,
  } as CSSProperties,
  iconContainer: {
    paddingRight: Spacing.size.medium,
    paddingTop: Spacing.size.tiny,
  } as CSSProperties,
  title: {
    ...Text.header.h3.bold,
    paddingBottom: Spacing.size.tiny,
  } as CSSProperties,
  usernameLabel: {
    ...Text.body.secondary.regular,
  } as CSSProperties,
  usernameValue: {
    ...Text.body.secondary.bold,
    paddingBottom: Spacing.size.large,
  } as CSSProperties,
  resetPasswordMessage: {
    ...Text.body.secondary.regular,
    paddingBottom: Spacing.size.medium,
  } as CSSProperties,
  button: {
    backgroundColor: Colors.alert.info.dark,
    borderRadius: 10,
    paddingTop: Spacing.size.small,
    paddingBottom: Spacing.size.small,
    paddingLeft: Spacing.size.extraLarge,
    paddingRight: Spacing.size.extraLarge,
    textAlign: 'center',
  } as CSSProperties,
  buttonText: {
    ...Text.body.main.bold,
    color: Colors.white,
    textDecoration: 'none',
  } as CSSProperties,
  buttonHref: {
    ...Text.caption.small.regular,
    color: Colors.gray,
    paddingBottom: Spacing.size.extraLarge,
    paddingTop: Spacing.size.small,
    maxWidth: DISPLAYED_HREF_MAX_WIDTH,
    overflowWrap: 'break-word',
    wordBreak: 'break-all',
  } as CSSProperties,
  resetPasswordDetails: {
    ...Text.body.secondary.regular,
  } as CSSProperties,
  loginInformationDescription: {
    ...Text.body.main.regular,
  } as CSSProperties,
  loginInformationBody: {
    ...Text.body.secondary.regular,
    paddingTop: Spacing.size.extraLarge,
  } as CSSProperties,
} as const
