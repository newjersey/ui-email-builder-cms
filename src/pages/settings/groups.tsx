import { HeadFC, Link } from 'gatsby'
import React, { FC } from 'react'
import { useGroups } from 'src/network/groups'
import { List, ListItem, LoadingOverlay } from 'src/ui'
import { DestroyGroup } from 'src/ui/DestroyDialog'
import { Layout, PageContent, Sidebar } from 'src/ui/Settings/Shared'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import './groups.css'

const GroupsPage: FC = () => {
  useRedirectIfNotSignedIn()
  const { data: groups, isLoading, error } = useGroups()

  return (
    <Layout>
      <Sidebar />
      <PageContent>
        <div className="settings-header groups">
          <h1>Groups</h1>
          <p>All of the groups can be found here</p>
          <div className="settings-actions">
            <Link to="/settings/groups/new" className="black-button add-new-group-link">
              Add New Group <span>+</span>
            </Link>
          </div>
        </div>
        {error && <p>{error.message}</p>}
        {groups && (
          <List className="library-list groups">
            {groups.map((group) => (
              <ListItem key={group.id} className="group">
                <div className="name-and-description">
                  <div className="library-name-container group-name">
                    <Link to={`/settings/groups/${group.id}`} className="library-name">
                      {group.name}
                    </Link>
                  </div>
                  <p className="library-description">{group.description}</p>
                </div>
                <DestroyGroup group={group} />
              </ListItem>
            ))}
          </List>
        )}
        {isLoading && <LoadingOverlay description="Loading groups" />}
      </PageContent>
    </Layout>
  )
}

export default GroupsPage

export const Head: HeadFC = () => <title>{formatPageTitle('Groups')}</title>
