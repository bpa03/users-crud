import * as React from 'react'
import {renderHook, waitFor, act} from '@testing-library/react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {UserMother} from '../../../../dummy/user-mother'
import useCreateUser from '../../../../src/features/users/hooks/use-create-user'

const queryClient = new QueryClient()
const wrapper = ({children}: {children: React.ReactNode}) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)

describe('useUser query hook', () => {
  test('Should create a user', async () => {
    const {result} = renderHook(() => useCreateUser(), {
      wrapper
    })
    
    act(() => {
      const body = UserMother.generateCreateUserDto()
      result.current.mutate(body)
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.id).toBeDefined()
  })

  test('Should return an error if the user creation fails', async () => {
    const {result} = renderHook(() => useCreateUser(), {
      wrapper
    })

    act(() => {
      const body = UserMother.generateCreateUserDto()
      result.current.mutate({...body, email: ''})
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.data?.id).toBeUndefined()
    expect(result.current.error).toBeDefined()
  })
})
