import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React from 'react'
import { SaveEmailTemplateDialog } from '../SaveEmailTemplateDialog'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { EmailTemplate, Language } from 'src/appTypes'
import {
  buildEmailTemplateConfig,
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
} from 'src/factories'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { PreviewText } from 'src/templates/PreviewText'
import { randomUUID } from 'crypto'
import { EmailTemplateState } from 'src/utils/EmailTemplateState'

describe('SaveEmailTemplateDialog', () => {
  let description: string
  let errorMessage: string | undefined
  let loading: boolean
  let loadingMessage: string
  let mutate: jest.Mock
  let onSuccess: jest.Mock
  let submitButtonText: string
  let title: string
  let trigger: string
  let previewText: string
  let emailTemplate: EmailTemplate.Unique.Config
  let emailTemplateChanges: EmailTemplate.Base.Config
  let language: Language
  let user: UserEvent
  let emailPartsContent: Record<string, any>

  beforeEach(async () => {
    language = 'english'
    description = faker.lorem.paragraph()
    errorMessage = undefined
    loading = false
    loadingMessage = faker.lorem.paragraph()
    mutate = jest.fn()
    onSuccess = jest.fn()
    submitButtonText = faker.lorem.words(3)
    title = faker.lorem.words(5)
    trigger = faker.lorem.words(2)
    previewText = faker.lorem.paragraph()
    const nameComponent = buildUniqueEmailComponent('Name', {
      defaultValue: { name: faker.lorem.word() },
    })
    const originalTranslation = buildEmailTranslation({
      language,
      previewText,
      components: [nameComponent],
    })
    const newName = 'new name'
    const newTranslation = buildEmailTranslation({
      language,
      previewText,
      components: [{ ...nameComponent, defaultValue: { name: newName }, subComponents: [] }],
    })
    emailTemplate = buildUniqueEmailConfig({ translations: [originalTranslation] })
    emailTemplateChanges = buildEmailTemplateConfig({
      name: emailTemplate.name,
      description: emailTemplate.description,
      translations: [newTranslation],
    })
    emailPartsContent = { [nameComponent.id]: { name: newName } }
    user = userEvent.setup()
  })

  it('displays its trigger', async () => {
    const { queryByRole } = render(
      <EmailTemplateState emailTemplate={emailTemplate}>
        {({ currentTranslation }) => (
          <EmailPartsContent initialData={emailTemplateChanges}>
            <PreviewText emailTranslation={currentTranslation}>
              <SaveEmailTemplateDialog
                description={description}
                errorMessage={errorMessage}
                loading={loading}
                loadingMessage={loadingMessage}
                mutate={mutate}
                onSuccess={onSuccess}
                submitButtonText={submitButtonText}
                title={title}
                trigger={trigger}
              />
            </PreviewText>
          </EmailPartsContent>
        )}
      </EmailTemplateState>,
    )
    const button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveClass('save-email-template-dialog-trigger')
    expect(button).toHaveTextContent(trigger)
  })

  describe('when open', () => {
    const renderAndOpen = async () => {
      const result = render(
        <EmailTemplateState emailTemplate={emailTemplate}>
          {({ currentTranslation }) => (
            <EmailPartsContent initialData={emailPartsContent}>
              <PreviewText emailTranslation={currentTranslation}>
                <SaveEmailTemplateDialog
                  description={description}
                  errorMessage={errorMessage}
                  loading={loading}
                  loadingMessage={loadingMessage}
                  mutate={mutate}
                  onSuccess={onSuccess}
                  submitButtonText={submitButtonText}
                  title={title}
                  trigger={trigger}
                />
              </PreviewText>
            </EmailPartsContent>
          )}
        </EmailTemplateState>,
      )
      await user.click(result.getByRole('button'))
      return result
    }

    it('displays its title', async () => {
      const { queryByText } = await renderAndOpen()
      expect(queryByText(title)).not.toBeNull()
    })

    it('displays its description', async () => {
      const { queryByText } = await renderAndOpen()
      expect(queryByText(description)).not.toBeNull()
    })

    it('displays the given error message', async () => {
      errorMessage = faker.lorem.paragraph()
      const { queryByText } = await renderAndOpen()
      expect(queryByText(errorMessage)).not.toBeNull()
    })

    describe('loading', () => {
      it('displays the loading message when loading', async () => {
        loading = true
        const { queryByRole } = await renderAndOpen()
        const loadingAlert = queryByRole('alert')
        expect(loadingAlert).not.toBeNull()
        expect(loadingAlert).toHaveTextContent(loadingMessage)
      })

      it('does not display the loading message when not loading', async () => {
        loading = false
        const { queryByRole } = await renderAndOpen()
        const loadingAlert = queryByRole('alert')
        expect(loadingAlert).toBeNull()
      })
    })

    it('calls mutate when the form is submitted', async () => {
      const { baseElement, getByLabelText } = await renderAndOpen()
      mutate.mockResolvedValue({ emailTemplate: { id: randomUUID() } })
      await user.clear(getByLabelText('Name'))
      await user.type(getByLabelText('Name'), emailTemplateChanges.name)
      await user.clear(getByLabelText('Description'))
      await user.type(getByLabelText('Description'), emailTemplateChanges.description!)
      await user.type(getByLabelText('Tags'), 'tag')

      const form = baseElement.querySelector('form')
      expect(form).not.toBeNull()

      const button = form!.querySelector('button[type="submit"]')
      expect(button).not.toBeNull()
      expect(button).toHaveTextContent(submitButtonText)

      expect(mutate).not.toHaveBeenCalled()
      await user.click(button!)
      expect(mutate).toHaveBeenCalledWith({
        ...emailTemplateChanges,
        tagNames: ['tag'],
      })
    })

    describe('submission with errors', () => {
      it('displays the inline errors', async () => {
        const { baseElement } = await renderAndOpen()
        const nameError = faker.lorem.words(4)
        mutate.mockResolvedValue({ errors: { name: nameError } })
        const form = baseElement.querySelector('form')
        const button = form!.querySelector('button[type="submit"]')
        await user.click(button!)
        expect(mutate).toHaveBeenCalled()
        expect(baseElement).toHaveTextContent(nameError)
      })

      it('does not call onSuccess', async () => {
        const { baseElement } = await renderAndOpen()
        const nameError = faker.lorem.words(4)
        mutate.mockResolvedValue({ errors: { name: nameError } })
        const form = baseElement.querySelector('form')
        const button = form!.querySelector('button[type="submit"]')
        await user.click(button!)
        expect(mutate).toHaveBeenCalled()
        expect(onSuccess).not.toHaveBeenCalled()
      })
    })

    describe('submission without errors', () => {
      it('calls onSuccess', async () => {
        const { baseElement } = await renderAndOpen()
        const emailTemplate = buildUniqueEmailConfig({ id: randomUUID() })
        mutate.mockResolvedValue({ emailTemplate: emailTemplate })
        const form = baseElement.querySelector('form')
        const button = form!.querySelector('button[type="submit"]')
        await user.click(button!)
        expect(mutate).toHaveBeenCalled()
        expect(onSuccess).toHaveBeenCalledWith(emailTemplate)
      })

      it('calls closes the dialog', async () => {
        const { baseElement } = await renderAndOpen()
        const emailTemplate = buildUniqueEmailConfig({ id: randomUUID() })
        mutate.mockResolvedValue({ emailTemplate })
        const form = baseElement.querySelector('form')
        const button = form!.querySelector('button[type="submit"]')
        await user.click(button!)
        expect(mutate).toHaveBeenCalled()
        expect(baseElement.querySelector('form')).toBeNull()
      })
    })
  })
})
