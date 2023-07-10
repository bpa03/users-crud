import {FC} from 'react'
import useCreateUser from '../hooks/use-create-user'
import UserForm from '../components/user-form'

const CreateUserForm: FC<object> = () => {
  const {mutate, isLoading} = useCreateUser()

 return (
   <UserForm 
    onSubmit={(user) => {
      mutate(user)
    }}
    loading={isLoading}
   />
 )
}

export default CreateUserForm
