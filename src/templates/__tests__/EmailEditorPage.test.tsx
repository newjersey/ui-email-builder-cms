import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import type { EmailTemplate } from 'src/appTypes'
import EmailEditorPage, { Head } from '../EmailEditorPage'
import {
  buildEmailTemplateComponent,
  buildEmailTemplateConfig,
  buildEmailTemplateSubComponent,
} from 'src/testHelpers'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

describe('EmailEditorPage', () => {
  let emailTemplate: EmailTemplate.Config
  let rendered: RenderResult
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
    emailTemplate = buildEmailTemplateConfig({
      components: [
        buildEmailTemplateComponent('Header', {
          subComponents: [
            buildEmailTemplateSubComponent('Header', { kind: 'Title' }),
            buildEmailTemplateSubComponent('Header', { kind: 'ProgramName' }),
          ],
        }),
        buildEmailTemplateComponent('Name'),
        buildEmailTemplateComponent('Body', {
          subComponents: [
            buildEmailTemplateSubComponent('Body', { kind: 'Intro' }),
            buildEmailTemplateSubComponent('Body', { kind: 'Status' }),
            buildEmailTemplateSubComponent('Body', { kind: 'SupplementalContent' }),
          ],
        }),
        buildEmailTemplateComponent('Footer', {
          subComponents: [buildEmailTemplateSubComponent('Footer', { kind: 'AdditionalContent' })],
        }),
        buildEmailTemplateComponent('Disclaimer'),
      ],
    })
    rendered = render(<EmailEditorPage pageContext={{ emailTemplate }} />)
  })

  it('is displays the layout', () => {
    const { baseElement } = rendered
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the EmailEditorContent', () => {
    const { baseElement } = rendered
    const h1 = baseElement.querySelector('h1[contenteditable="true"]')
    expect(h1).not.toBeNull()
    expect(h1).toHaveTextContent('Title')
  })

  it('displays the EmailEditorSidebar', () => {
    const { queryByText } = rendered
    expect(queryByText('Back')).not.toBeNull()
  })

  describe('Head', () => {
    it("uses the email template's name as the title", () => {
      const { baseElement } = render(<Head pageContext={{ emailTemplate }} {...({} as any)} />)
      expect(baseElement.querySelector('title')).toHaveTextContent(emailTemplate.name)
    })
  })

  describe('preview text', () => {
    it('allows users to edit preview text in the sidebar which is added to the email markup', async () => {
      const value = faker.lorem.paragraph()
      const { getByLabelText, baseElement } = rendered
      const input = getByLabelText('Preview text')
      await user.type(input, value)
      const previewText = baseElement.querySelector('#preview-text')
      expect(previewText).not.toBeNull()
      expect(previewText).toHaveTextContent(value)
    })
  })

  describe('toggling/editing components and their subcomponents', () => {
    it('preserves entered subcomponent text after toggling a subcomponent off and then on again', async () => {
      const value = faker.lorem.paragraph()
      const { getAllByLabelText } = rendered
      const input = () => getAllByLabelText('Title')[1]
      const subComponentToggle = () => getAllByLabelText('Title')[0]

      await user.clear(input()!)
      await user.type(input()!, value)
      expect(input()).toHaveTextContent(value)

      await user.click(subComponentToggle())
      expect(input()).toBeUndefined()

      await user.click(subComponentToggle())
      expect(input()).toBeDefined()
      expect(input()).toHaveTextContent(value)
    })

    it('preserves entered subcomponent text after toggling a component off and then on again', async () => {
      const value = faker.lorem.paragraph()
      const { getAllByLabelText } = rendered
      const input = () => getAllByLabelText('Title')[1]
      const componentToggle = () => getAllByLabelText('Header')[0]

      await user.clear(input()!)
      await user.type(input()!, value)
      expect(input()).toHaveTextContent(value)

      await user.click(componentToggle())
      expect(input()).toBeUndefined()

      await user.click(componentToggle())
      expect(input()).toBeDefined()
      expect(input()).toHaveTextContent(value)
    })

    it('preserves entered component text after toggling a component off and then on again', async () => {
      const value = faker.lorem.paragraph()
      const { queryByLabelText, getAllByLabelText } = rendered
      const input = () => queryByLabelText("Recipient's name")
      const componentToggle = () => getAllByLabelText('Name')[0]

      await user.clear(input()!)
      await user.type(input()!, value)
      expect(input()).toHaveTextContent(value)

      await user.click(componentToggle())
      expect(input()).toBeNull()

      await user.click(componentToggle())
      expect(input()).not.toBeNull()
      expect(input()).toHaveTextContent(value)
    })
  })
})
