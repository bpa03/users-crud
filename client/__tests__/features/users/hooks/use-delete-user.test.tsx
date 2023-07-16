import * as React from 'react'
import {renderHook, waitFor, act} from '@testing-library/react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {faker} from '@faker-js/faker'
import useDeleteUser from '../../../../src/features/users/hooks/use-delete-user'

const queryClient = new QueryClient()
const wrapper = ({children}: {children: React.ReactNode}) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)

describe('useDeleteUser mutation hook', () => {
  test('Should delete an user', async () => {
    const {result} = renderHook(() => useDeleteUser(), {
      wrapper
    })
    
    act(() => {
      const userId = 'd278c356-e7d7-4823-969f-36aae2614681'
      result.current.mutate(userId)
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
  })
  test('Should throw an error if sent an invalid user id', async () => {
    const {result} = renderHook(() => useDeleteUser(), {
      wrapper
    })
    
    act(() => {
      const userId = faker.string.uuid()
      result.current.mutate(userId)
    })

    await waitFor(() => expect(result.current.status).toBe('error'))
    expect(result.current.error).toBeDefined()
  })
})