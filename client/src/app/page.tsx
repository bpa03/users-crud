import {dehydrate} from '@tanstack/react-query'
import Hydrate from '@/lib/hydrate-client'
import {getUsers} from '@/features/users/api/get-users'
import CreateUserForm from '@/features/users/containers/create-user-form'
import GetUsersList from '@/features/users/containers/get-users-list'
import getQueryClient from '@/lib/get-query-client'

export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['users'], getUsers)
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <main className="w-11/12 mx-auto">
        <h1 className="text-center my-8 font-extrabold text-3xl underline">Users crud</h1>
        <div className="flex flex-row gap-8 mt-12">
          <div className="flex-[.4]">
            <CreateUserForm />
          </div>
          <div className="flex-[.6]">
            <GetUsersList />
          </div>
        </div>
      </main>
    </Hydrate>
  )
}
