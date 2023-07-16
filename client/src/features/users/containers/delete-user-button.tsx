import {FC} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import {MdOutlineClose} from 'react-icons/md'
import {Button} from '../../../components/ui/button'
import useDeleteUser from '../hooks/use-delete-user'
import {useToast} from '../../../components/ui/use-toast'
import {ListOfUsers} from '../types'

interface DeleteUserButtonProps {
  id: string | number
}

const DeleteUserButton: FC<DeleteUserButtonProps> = ({id}) => {
  const {toast} = useToast()
  const queryClient = useQueryClient()
  const {mutate} = useDeleteUser({
    config: {
      onMutate: async (id) => {
        await queryClient.cancelQueries({queryKey: ['users']})
        const previousUsers = queryClient.getQueryData<ListOfUsers>(['users'])

        if (previousUsers) {
          const updatedUsers = previousUsers.filter(
            (user) => user.id.toString() !== id.toString()
          )
          queryClient.setQueryData(['users'], updatedUsers)
        }

        return () => queryClient.setQueryData(['users'], previousUsers)
      },
      onError: (error, id, ctx) => {
        if (typeof ctx === 'function') {
          ctx()
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['users'])
      },
      onSuccess: () => {
        toast({
          title: 'The user was removed successfully!',
          variant: 'default'
        })
      }
    }
  })

  return (
    <Button variant="destructive" size="icon" onClick={() => mutate(id)} aria-label="delete user">
      <MdOutlineClose size={18} />
    </Button>
  )
}

export default DeleteUserButton
