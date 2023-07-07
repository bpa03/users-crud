import UsersList from '@/features/users/components/users-list'
import getQueryClient from '@/lib/get-query-client'
import {dehydrate} from '@tanstack/react-query'
import Hydrate from '@/lib/hydrate-client'
import {getUsers} from '@/features/users/api/get-users'

export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['users'], getUsers)
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <main>
        <h1>Users crud</h1>
        <UsersList />
      </main>
    </Hydrate>
  )
}
