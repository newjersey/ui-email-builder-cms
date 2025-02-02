import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { useEmailTemplates } from '../useEmailTemplates'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, buildEmailTemplateIndex, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'

jest.mock('../../useAuthedFetch')

describe('useEmailTemplates', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('queries for email templates', async () => {
    const client = new QueryClient()
    const emailTemplates = [buildEmailTemplateIndex(), buildEmailTemplateIndex()]
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { emailTemplates } })

    const { result } = renderHook(() => useEmailTemplates(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })

    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: '/email-templates',
      method: 'GET',
    })
    expect(result.current.data).toEqual(emailTemplates)
  })
})
