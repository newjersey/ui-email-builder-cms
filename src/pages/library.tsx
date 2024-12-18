import React, { FC, useState } from 'react'
import { HeadFC, Link } from 'gatsby'
import {
  Heading,
  Layout,
  PageContent,
  Paragraph,
  Sidebar,
  SkipNavContent,
  SpacedContainer,
  SidebarNavigation,
  List,
  Input,
  ListItem,
} from 'src/ui'
import { useEmailTemplatesData } from 'src/utils/useEmailTemplatesData'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import './library.css'

const LibaryPage: FC = () => {
  useRedirectIfNotSignedIn()
  const [filterQuery, setFilterQuery] = useState('')
  const lowerCaseFilterQuery = filterQuery.toLowerCase()
  const emailTemplates = useEmailTemplatesData()
  const filteredEmailTemplates = emailTemplates.filter(({ name, description }) => {
    return (
      name.toLowerCase().includes(lowerCaseFilterQuery) ||
      description?.toLowerCase().includes(lowerCaseFilterQuery)
    )
  })

  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <PageContent element="main">
        <SkipNavContent />
        <SpacedContainer>
          <Heading element="h1">Library</Heading>
          <Paragraph>Check out this library of templates</Paragraph>

          <form role="search" className="library-filter-form">
            <Input
              className="library-filter-input"
              id="filter-email-templates"
              list="email-templates-data-list"
              onTextChange={setFilterQuery}
              type="search"
              value={filterQuery}
            />
            <label className="library-filter-label" htmlFor="filter-email-templates">
              Filter
            </label>
            <datalist id="email-templates-data-list">
              {emailTemplates.map((emailTemplate, i) => (
                <option key={i} value={emailTemplate.name} />
              ))}
            </datalist>
          </form>

          {filteredEmailTemplates.length > 0 ? (
            <List className="library-list">
              {filteredEmailTemplates.map(({ id, name, description, path }) => (
                <ListItem key={id} className="library-item">
                  <Link to={path} className="library-name">
                    {name}
                  </Link>
                  <p className="library-description">{description}</p>
                </ListItem>
              ))}
            </List>
          ) : (
            <Paragraph className="library-empty-message">
              Sorry, we don't have any email templates that match the current filter.
            </Paragraph>
          )}
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default LibaryPage

export const Head: HeadFC = () => <title>{formatPageTitle('Libary')}</title>
