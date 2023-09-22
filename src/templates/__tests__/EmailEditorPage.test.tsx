import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import type { EmailTemplate } from 'src/appTypes'
import EmailEditorPage, { Head } from '../EmailEditorPage'
import { TEST_IDS } from '../EmailEditorContents'

describe('EmailEditorPage', () => {
  let emailTemplate: EmailTemplate
  let rendered: RenderResult

  beforeEach(() => {
    emailTemplate = {
      name: faker.lorem.word(),
      description: faker.lorem.paragraph(),
      components: [
        { component: 'Header', description: faker.lorem.words(3) },
        { component: 'Footer', description: faker.lorem.words(3) },
      ],
    }
    rendered = render(<EmailEditorPage pageContext={{ emailTemplate }} />)
  })

  it('is displays the layout', () => {
    const { baseElement } = rendered
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the EmailEditorContents', () => {
    const { queryByTestId } = rendered
    expect(queryByTestId(TEST_IDS.emailEditorContents)).not.toBeNull()
  })

  it('displays the EmailEditorSidebar', () => {
    const { queryByText } = rendered
    expect(queryByText('Back to Home')).not.toBeNull()
  })

  describe('Head', () => {
    it("uses the email template's name as the title", () => {
      const { baseElement } = render(<Head pageContext={{ emailTemplate }} {...({} as any)} />)
      expect(baseElement.querySelector('title')).toHaveTextContent(emailTemplate.name)
    })
  })
})