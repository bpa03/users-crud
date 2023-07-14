import {dehydrate} from '@tanstack/react-query'
import Hydrate from '@/lib/hydrate-client'
import {getUsers} from '@/features/users/api/get-users'
import GetUsersTable from '@/features/users/containers/get-users-table'
import getQueryClient from '@/lib/get-query-client'
import CreateUserForm from '@/features/users/containers/create-user-form'

export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['users'], getUsers)
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <main className="w-11/12 mx-auto">
        <h1 className="text-center my-12 font-extrabold text-3xl underline">Users CRUD</h1>
        <div className="w-10/12 mx-auto space-y-4 pb-12">
          <CreateUserForm />
          <GetUsersTable />
        </div>
      </main>
    </Hydrate>
  )
}
