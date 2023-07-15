import * as React from 'react'
import {renderHook, waitFor, act} from '@testing-library/react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {UserMother} from '../../../../dummy/user-mother'
import useUpdateUser from '../../../../src/features/users/hooks/use-update-user'

const queryClient = new QueryClient()
const wrapper = ({children}: {children: React.ReactNode}) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)

describe('useUpdateUser mutation hook', () => {
  test('Should update a user', async () => {
    const user = UserMother.generateUser()
    const body = UserMother.generateCreateUserDto()
    const {result} = renderHook(() => useUpdateUser(), {
      wrapper
    })
    
    act(() => {
      result.current.mutate({body, id: user.id})
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.id).toBeDefined()
    expect(result.current.data?.firstname).toEqual(body.firstname)
    expect(result.current.data?.lastname).toEqual(body.lastname)
    expect(result.current.data?.age).toEqual(body.age)
  })

  test('Should throw an error if update mutation fails', async () => {
    const user = UserMother.generateUser()
    const body = UserMother.generateCreateUserDto()
    const {result} = renderHook(() => useUpdateUser(), {
      wrapper
    })
    
    act(() => {
      result.current.mutate({body: {...body, email: '', firstname: ''}, id: user.id})
    })

    await waitFor(() => expect(result.current.status).toBe('error'))
    expect(result.current.error).toBeDefined()
  })
})