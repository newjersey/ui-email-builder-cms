import React, { FC, ReactElement } from 'react'
import { EmailTranslation } from 'src/appTypes'
import { Sidebar, SkipNavContent, SpacedSidebarContainer } from 'src/ui'
import { BackLink } from './BackLink'
import { EmailEditorSidebarAccordion } from './EmailEditorSidebarAccordion'

interface Props {
  heading: ReactElement
  emailTranslation: EmailTranslation.Unique
}

export const EmailEditorSidebar: FC<Props> = ({ heading, emailTranslation }) => {
  const components = emailTranslation.components

  return (
    <Sidebar id="sidebar-container">
      <SpacedSidebarContainer>
        <BackLink />
        <SkipNavContent />
        {heading}
      </SpacedSidebarContainer>
      {emailTranslation.language !== 'not-set' && (
        <EmailEditorSidebarAccordion.Container>
          {components.map((emailComponent) => (
            <EmailEditorSidebarAccordion.EmailComponent
              key={emailComponent.id}
              emailComponent={emailComponent}
            >
              {(emailComponent.subComponents ?? []).map((emailSubComponent, i) => (
                <EmailEditorSidebarAccordion.EmailSubComponent
                  key={emailSubComponent.id}
                  component={emailComponent}
                  emailSubComponent={emailSubComponent}
                  nextEmailSubComponent={(emailComponent.subComponents ?? [])[i + 1]}
                />
              ))}
            </EmailEditorSidebarAccordion.EmailComponent>
          ))}
        </EmailEditorSidebarAccordion.Container>
      )}
    </Sidebar>
  )
}
