import { UserRole } from 'src/appTypes'
import { useCurrentUser } from 'src/network/useCurrentUser'

const admin = {
  isAdmin: true,
  role: 'admin' satisfies UserRole,
} as const

const member = {
  isAdmin: false,
  role: 'member' satisfies UserRole,
} as const

export const useCurrentRole = () => {
  const { data: user } = useCurrentUser()

  switch (user?.role) {
    case 'admin':
      return admin
    default:
      return member
  }
}