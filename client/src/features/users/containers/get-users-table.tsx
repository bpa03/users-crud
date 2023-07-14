'use client'
import {FC} from 'react'
import UsersTable from '../components/users-table'
import useUsers from '../hooks/use-users'

const GetUsersTable: FC<object> = () => {
  const {isLoading, data} = useUsers({
    config: {
      refetchInterval: false,
      refetchOnWindowFocus: true,
      staleTime: 0
    }
  })

 return (
   <UsersTable users={data} isLoading={isLoading} />
 )
}

export default GetUsersTable
