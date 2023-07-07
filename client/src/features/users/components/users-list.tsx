'use client'
import {FC} from 'react'
import useUsers from '../hooks/use-users'

const UsersList: FC<object> = () => {
  const {isLoading, error} = useUsers({
    config: {refetchInterval: false, refetchOnWindowFocus: false}
  })

  return (
    <>
      {isLoading ? <h1>Loading</h1> : <h1>List of users</h1>}
      {error ? <h1>{error.message}</h1> : null}
    </>
  )
}

export default UsersList
