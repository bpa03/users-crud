import * as React from 'react'
import {renderHook, waitFor} from '@testing-library/react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import useUsers from '../../../../src/features/users/hooks/use-users'

const queryClient = new QueryClient()
const wrapper = ({children}: {children: React.ReactNode}) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)

describe('useUser query hook', () => {
  test('Should fetch a list of users', async () => {
    const {result} = renderHook(() => useUsers(), {
      wrapper
    })
    await waitFor(() => expect(result.current.status).toBe('success'))
    expect(result.current.data).toBeDefined()
    expect(Array.isArray(result.current.data)).toBe(true)
  })
})
