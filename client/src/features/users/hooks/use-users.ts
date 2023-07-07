import {useQuery, UseQueryOptions} from '@tanstack/react-query'
import {getUsers} from '../api/get-users'
import {ListOfUsers} from '../types'

type UserUsersOptions = {
  config?: UseQueryOptions<unknown, Error, ListOfUsers>
}

export default function useUsers({config}: UserUsersOptions = {}) {
  return useQuery({
    queryFn: () => getUsers(),
    queryKey: ['users'],
    ...config
  })
}