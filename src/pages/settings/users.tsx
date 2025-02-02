import React, { FC } from 'react'
import { HeadFC } from 'gatsby'
import { IndexList, IndexListItem, LoadingOverlay } from 'src/ui'
import { DestroyUser } from 'src/ui/DestroyDialog'
import { Layout, PageContent, Sidebar } from 'src/ui/Settings/Shared'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useUsers } from 'src/network/users'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import { EditUserDialog } from 'src/ui/EditDialog/EditUserDialog'
import { useRedirectIfNotAdmin } from 'src/utils/useRedirectIfNotAdmin'
import './users.css'

const UsersPage: FC = () => {
  useRedirectIfNotSignedIn()
  useRedirectIfNotAdmin()

  const { data: users, isLoading, error } = useUsers()

  return (
    <Layout>
      <Sidebar />
      <PageContent>
        <div className="settings-header">
          <h1>Users</h1>
          <p>All of the users can be found here</p>
        </div>
        {error && <p>{error.message}</p>}
        {users && users.length > 0 && (
          <IndexList>
            {users.map((user) => (
              <IndexListItem key={user.id}>
                <div className="user-details">
                  <span className="user-email">{user.email}</span>
                  <span className="user-role">{user.role}</span>
                </div>
                <div className="user-actions">
                  <EditUserDialog user={user} />
                  <DestroyUser user={user} />
                </div>
              </IndexListItem>
            ))}
          </IndexList>
        )}

        {isLoading && <LoadingOverlay description="Loading the users" />}
      </PageContent>
    </Layout>
  )
}

export default UsersPage

export const Head: HeadFC = () => <title>{formatPageTitle('Users')}</title>
