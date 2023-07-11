'use client'
import {FC} from 'react'
import UsersList from '../components/users-list'
import useUsers from '../hooks/use-users'

const GetUsersList: FC<object> = () => {
  const {isLoading, data} = useUsers({
    config: {
      refetchInterval: false,
      refetchOnWindowFocus: true
    }
  })

  return <UsersList isLoading={isLoading} users={data} />
}

export default GetUsersList
