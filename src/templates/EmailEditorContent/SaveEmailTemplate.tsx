import React, { FC, useState } from 'react'
import { Button, Dialog, LoadingOverlay, Form, FormField } from 'src/ui'
import { useEmailTemplateConfig } from '../EmailTemplateConfig'
import {
  CreateEmailTemplateErrorResponse,
  useCreateOrUpdateEmailTemplate,
} from 'src/network/emailTemplates'
import { navigate } from 'gatsby'
import { useEmailPartsContentData } from '../EmailPartsContent'
import { EmailTemplate } from 'src/appTypes'
import { usePreviewText } from '../PreviewText'
import { stringFromFormData } from 'src/utils/stringFromFormData'

export const SaveEmailTemplate: FC = () => {
  const emailTemplate = useEmailTemplateConfig()
  const [emailPartsContentData] = useEmailPartsContentData()
  const [previewText] = usePreviewText()
  const [validationErrors, setValidationErrors] = useState<
    CreateEmailTemplateErrorResponse['errors'] | null
  >(null)
  const { error, mutateAsync, isPending } = useCreateOrUpdateEmailTemplate(emailTemplate.id)

  return (
    <Dialog
      trigger={<Button className="save-email-template-trigger">Save</Button>}
      title="Save Email Template"
      description={
        emailTemplate.id
          ? 'Update this email template in your library'
          : 'Save this email template to your library'
      }
      contents={({ close }) => (
        <>
          <Form
            errorMessage={error?.message}
            onSubmit={async (event) => {
              setValidationErrors(null)
              const formData = new FormData(event.currentTarget)
              const result = await mutateAsync({
                ...emailTemplateMergeDefaultValues(emailTemplate, emailPartsContentData),
                previewText,
                name: stringFromFormData(formData, 'name'),
                description: stringFromFormData(formData, 'description'),
              })

              if (result && 'errors' in result) {
                setValidationErrors(result.errors)
              } else if (emailTemplate.id) {
                close()
              } else {
                navigate('/my-library')
              }
            }}
          >
            <FormField
              id="name"
              name="name"
              label="Name"
              required
              defaultValue={emailTemplate.name}
              error={validationErrors?.name}
            />
            <FormField
              id="description"
              name="description"
              label="Description"
              defaultValue={emailTemplate.description}
            />
            <Button type="submit">Save</Button>
          </Form>
          {isPending && <LoadingOverlay description="Creating email template" />}
        </>
      )}
    />
  )
}

export const emailTemplateMergeDefaultValues = (
  emailTemplate: EmailTemplate.UniqueConfig,
  emailPartsContentData: Record<string, any>,
): EmailTemplate.UniqueConfig => {
  return {
    ...emailTemplate,
    components: emailTemplate.components?.map((component) => ({
      ...component,
      defaultValue: emailPartsContentData[component.id] ?? component.defaultValue,
      subComponents: component.subComponents?.map((subComponent) => ({
        ...subComponent,
        defaultValue: emailPartsContentData[subComponent.id] ?? subComponent.defaultValue,
      })),
    })),
  }
}
