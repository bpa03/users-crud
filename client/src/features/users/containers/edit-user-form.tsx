import {FC} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import {BsPencilFill} from 'react-icons/bs'
import {Button} from '../../../components/ui/button'
import UserForm from '../components/user-form'
import {ListOfUsers, User} from '../types'
import useUpdateUser from '../hooks/use-update-user'

interface EditUserFormProps {
  user: User;
}

const EditUserForm: FC<EditUserFormProps> = ({user}) => {
  const queryClient = useQueryClient()
  const {mutate, isLoading} = useUpdateUser({
    config: {
      onMutate: async (updateUser) => {
        await queryClient.cancelQueries({queryKey: ['users']})
        const previousUsers = queryClient.getQueryData<ListOfUsers>(['users'])

        if (previousUsers) {
          const updatedUsers = previousUsers.map((aUser) => (
            aUser.id === user.id.toString() ? {...aUser, ...updateUser.body} : aUser
          ))

          queryClient.setQueryData(['users'], updatedUsers)
        }

        return () => queryClient.setQueryData(['users'], previousUsers)
      },
      onError: (error, variables, ctx) => {
        if (typeof ctx === 'function') {
          ctx()
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['users'])
      }
    }
  })

 return (
   <UserForm
    loading={isLoading}
    formTitle="Update user"
    formDescription="Update an existing user"
    initialValues={user}
    mode="edit"
    onSubmit={(form) => {
      mutate({body: form, id: user.id})
    }}
   >
    <Button variant="outline" size="icon">
      <BsPencilFill size={14}/>
    </Button>
   </UserForm>
 )
}

export default EditUserForm
