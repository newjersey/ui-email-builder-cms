import { render } from '@testing-library/react'
import React from 'react'
import { EmailParts, EmailTemplate, EmailTranslation } from 'src/appTypes'
import { EmailTemplateState } from 'src/utils/EmailTemplateState'
import { TranslationLinks } from '../TranslationLinks'
import { CurrentlyActiveEmailPart } from 'src/templates/CurrentlyActiveEmailPart'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import {
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
  ShowActiveEmailPart,
  ShowEmailPartsContentKeys,
} from 'src/testHelpers'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

describe('TranslationLinks', () => {
  let emailTemplate: EmailTemplate.Unique.Config
  let emailTranslation: EmailTranslation.Unique
  let emailComponent: EmailParts.TranslationLinks

  beforeEach(async () => {
    emailComponent = buildUniqueEmailComponent('TranslationLinks')
    emailTranslation = buildEmailTranslation({ language: 'english', components: [emailComponent] })
    emailTemplate = buildUniqueEmailConfig({
      translations: [emailTranslation, buildEmailTranslation({ language: 'spanish' })],
    })
  })

  const renderComponent = () => {
    return render(
      <EmailTemplateState emailTemplate={emailTemplate}>
        {() => (
          <CurrentlyActiveEmailPart>
            <EmailPartsContent>
              <table>
                <tbody>
                  <TranslationLinks emailComponent={emailComponent}>{null}</TranslationLinks>
                </tbody>
              </table>
              <ShowActiveEmailPart />
              <ShowEmailPartsContentKeys />
            </EmailPartsContent>
          </CurrentlyActiveEmailPart>
        )}
      </EmailTemplateState>,
    )
  }

  it('displays all available languages for the email template', async () => {
    const { queryByText } = renderComponent()
    expect(queryByText('English')).not.toBeNull()
    expect(queryByText('Español')).not.toBeNull()
  })

  it('displays the current language as plain text', async () => {
    const { queryByText } = renderComponent()
    const english = queryByText('English')
    expect(english).not.toBeNull()
    expect(english?.nodeName).toEqual('SPAN')
  })

  it('displays the other languages as links', async () => {
    const { queryByText, queryByRole } = renderComponent()
    const spanish = queryByText('Español')
    expect(spanish).not.toBeNull()
    expect(spanish?.nodeName).toEqual('SPAN')
    const link = queryByRole('link')
    expect(link).not.toBeNull()
    expect((link as any).href).toEqual('http://example.org/')
  })

  it('has editable fields', async () => {
    const user = userEvent.setup()
    const { getByLabelText, queryByText, baseElement } = renderComponent()

    const englishInput = getByLabelText('English label')
    const englishValue = faker.lorem.word()
    await user.clear(englishInput)
    await user.type(englishInput, englishValue)

    expect(queryByText(englishValue)).not.toBeNull()
    expectEmailPartContentFor(emailComponent.id, baseElement)

    const spanishInput = getByLabelText('Spanish label')
    const spanishValue = faker.lorem.word()
    await user.clear(spanishInput)
    await user.type(spanishInput, spanishValue)

    expect(queryByText(spanishValue)).not.toBeNull()
    expectEmailPartContentFor(emailComponent.id, baseElement)
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByLabelText, baseElement } = renderComponent()
    expectActiveEmailPartToNotBe(emailComponent.id, baseElement)
    await user.click(getByLabelText('English label'))
    expectActiveEmailPartToBe(emailComponent.id, baseElement)
  })
})
