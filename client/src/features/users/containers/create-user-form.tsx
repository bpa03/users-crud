'use client'
import {FC} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import useCreateUser from '../hooks/use-create-user'
import UserForm from '../components/user-form'
import {Button} from '../../../components/ui/button'
import {ListOfUsers} from '../types'

const CreateUserForm: FC<object> = () => {
  const queryClient = useQueryClient()
  const {mutate, isLoading} = useCreateUser({
    config: {
      onMutate: async (newUser) => {
        await queryClient.cancelQueries({queryKey: ['users']})
        const previousUsers = queryClient.getQueryData(['users'])

        queryClient.setQueryData<ListOfUsers>(['users'], (old) => {
          return !old
            ? [
                {
                  ...newUser,
                  id: 'temp'
                }
              ]
            : [
                ...old,
                {
                  ...newUser,
                  id: 'temp'
                }
              ]
        })
        return previousUsers
      },
      onError: (err, newUser, ctx) => {
        queryClient.setQueryData(['users'], ctx)
      },
      onSettled: () => {
        queryClient.invalidateQueries({queryKey: ['users']})
      }
    }
  })

  return (
    <UserForm
      onSubmit={(user) => {
        mutate(user)
      }}
      loading={isLoading}
      formDescription="Create and add a new user in your database"
      formTitle="Create user"
    >
      <Button variant="outline">Create</Button>
    </UserForm>
  )
}

export default CreateUserForm
