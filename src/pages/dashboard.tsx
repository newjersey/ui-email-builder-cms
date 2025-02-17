import React, { FC } from 'react'
import { Link, type HeadFC } from 'gatsby'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { format } from 'date-fns'
import { flatten, sortBy } from 'lodash'
import {
  Heading,
  Layout,
  List,
  ListItem,
  LoadingOverlay,
  PageContent,
  Paragraph,
  Sidebar,
  SidebarNavigation,
  SkipNavContent,
} from 'src/ui'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import { EmailTemplateIndexItem, useEmailTemplates } from 'src/network/emailTemplates'
import { QuillHand } from 'src/ui/Svg/QuillHand'
import 'src/styles/app.css'
import './dashboard.css'

const DashboardPage: FC = () => {
  useRedirectIfNotSignedIn()
  const { data, isLoading, error } = useEmailTemplates()
  const templates = [
    ...(data?.user || []),
    ...flatten(data?.groups.map((group) => group.templates) || []),
  ]
  const currentDrafts = sortBy(templates, ({ updatedAt }) => updatedAt)
    .reverse()
    .slice(0, 3)

  return (
    <Layout element="div">
      <Sidebar className="main-nav-sidebar">
        <SidebarNavigation />
      </Sidebar>
      <SkipNavContent />
      <PageContent className="home-page" element="main">
        <VisuallyHidden>
          <h1>Email Builder (Beta)</h1>
        </VisuallyHidden>
        <section className="home-page-section drafts-section">
          <div className="drafts-header">
            <Heading element="h2">My Drafts</Heading>
            {currentDrafts.length > 0 ? <Link to="/my-drafts">See All Drafts</Link> : null}
          </div>
          {error && (
            <p className="error-message">
              There was an error loading your drafts. Please refresh the page.
            </p>
          )}
          {currentDrafts.length > 0 ? (
            <List className="home-page-drafts-list">
              {currentDrafts.map((emailTemplate) => (
                <EmailTemplateDraftsListItem key={emailTemplate.id} emailTemplate={emailTemplate} />
              ))}
            </List>
          ) : (
            !error && (
              <div className="no-drafts-message">
                <QuillHand />
                <p>Looks like you don&rsquo;t have any drafts.</p>
                <span>Start creating an email using the options below.</span>
              </div>
            )
          )}
        </section>
        <section className="home-page-section">
          <div className="heading-and-actions">
            <Heading element="h2">Create an Email</Heading>
          </div>
          <Paragraph>Build custom emails that you are ready to test/deploy</Paragraph>
          <div className="create-email-templates">
            <div className="template-wrapper">
              <p className="template-name">Blank Slate</p>
              <p className="template-description">
                Start with nothing in the email and add on the elements you need
              </p>
              <div className="template-link-wrapper">
                <Link className="template-link" to="/email-templates/blank-slate/">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="template-wrapper">
              <p className="template-name">Everything Bagel</p>
              <p className="template-description">
                Start with all the options added and take away anything you don't want
              </p>
              <div className="template-link-wrapper">
                <Link className="template-link" to="/email-templates/everything-bagel/">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="create-email-templates-separator">
              <p>--or--</p>
            </div>
            <div className="template-wrapper">
              <p className="template-name">Use an existing email</p>
              <p className="template-description">
                Browse existing emails to gain inspiration for your new email.
              </p>
              <div className="template-link-wrapper">
                <Link className="template-link" to="/library/">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
        {isLoading && <LoadingOverlay description="Loading drafts" />}
      </PageContent>
    </Layout>
  )
}

const EmailTemplateDraftsListItem: FC<{ emailTemplate: EmailTemplateIndexItem }> = ({
  emailTemplate,
}) => {
  const path = `/email-templates/${emailTemplate.id}`
  return (
    <ListItem key={emailTemplate.id} className="draft-item">
      <div className="draft-info">
        <Link to={path} className="draft-name">
          {emailTemplate.name}
        </Link>
        <p className="draft-description">{emailTemplate.description}</p>
      </div>
      <div className="draft-link-wrapper">
        <Link to={path} className="draft-link">
          Go to Draft
        </Link>
        {emailTemplate.updatedAt && (
          <span>Last saved {format(emailTemplate.updatedAt, 'LLL d, yyyy @ h:mmaaa')}</span>
        )}
      </div>
    </ListItem>
  )
}

export default DashboardPage

export const Head: HeadFC = () => <title>{formatPageTitle('Home')}</title>
