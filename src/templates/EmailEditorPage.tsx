import React, { FC, useState } from 'react'
import { type HeadFC } from 'gatsby'
import { Layout, PageContent } from 'src/ui'
import type { EmailTemplate } from 'src/appTypes'
import { ClearCurrentlyActiveEmailPart, CurrentlyActiveEmailPart } from './CurrentlyActiveEmailPart'
import { EmailEditorContent } from './EmailEditorContent'
import { EmailEditorHeadingAndSelect } from './EmailEditorSidebar/EmailEditorHeadingAndSelect'
import { EmailEditorSidebar } from './EmailEditorSidebar'
import { EmailPartsContent } from './EmailPartsContent'
import { EmailTemplateConfig } from './EmailTemplateConfig'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { PreviewText } from './PreviewText'
import { ShouldShowEmailPart } from './ShouldShowEmailPart'
import { shouldShowEmailPartsFromEmailTemplate } from 'src/utils/shouldShowEmailPartsFromEmailTemplate'
import { SyncSidebarAndPreviewScroll } from './SyncSidebarAndPreviewScroll'
import uniqueId from 'lodash.uniqueid'
import './EmailEditorPage.css'

interface PageContext {
  emailTemplate: EmailTemplate.Config
}

interface Props {
  pageContext: PageContext
}

const EmailEditorPage: FC<Props> = ({ pageContext }) => {
  const [emailTemplate] = useState<EmailTemplate.UniqueConfig>(() => ({
    ...pageContext.emailTemplate,
    components: addIds(pageContext.emailTemplate.components ?? []),
  }))

  return (
    <Layout element="main">
      <EmailTemplateConfig emailTemplateConfig={emailTemplate}>
        <ShouldShowEmailPart initialData={shouldShowEmailPartsFromEmailTemplate(emailTemplate)}>
          <CurrentlyActiveEmailPart>
            <SyncSidebarAndPreviewScroll>
              <ClearCurrentlyActiveEmailPart />
              <EmailPartsContent>
                <EmailEditorSidebar
                  emailTemplate={emailTemplate}
                  heading={<EmailEditorHeadingAndSelect emailTemplate={emailTemplate} />}
                />
                <PreviewText initialValue={emailTemplate.previewText}>
                  <PageContent element="div" className="email-editor-page-content">
                    <EmailEditorContent emailTemplate={emailTemplate} />
                  </PageContent>
                </PreviewText>
              </EmailPartsContent>
            </SyncSidebarAndPreviewScroll>
          </CurrentlyActiveEmailPart>
        </ShouldShowEmailPart>
      </EmailTemplateConfig>
    </Layout>
  )
}

export default EmailEditorPage

export const Head: HeadFC<object, PageContext> = ({ pageContext }) => {
  const { name } = pageContext.emailTemplate
  return <title>{formatPageTitle(name)}</title>
}

const addIds = (components: EmailTemplate.Component[]): EmailTemplate.UniqueComponent[] => {
  return components.map(({ subComponents, ...emailComponent }) => {
    return {
      ...emailComponent,
      id: uniqueId(`component_${emailComponent.kind}_`),
      subComponents: addIdsToSubComponents(subComponents ?? []),
    }
  })
}

const addIdsToSubComponents = (
  subComponents: EmailTemplate.SubComponent[],
): EmailTemplate.UniqueSubComponent[] => {
  return subComponents.map((subComponent) => {
    return {
      ...subComponent,
      id: uniqueId(`sub_component_${subComponent.kind}_`),
    }
  })
}
