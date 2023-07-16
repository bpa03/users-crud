import {FC} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import {MdOutlineClose} from 'react-icons/md'
import {Button} from '../../../components/ui/button'
import useDeleteUser from '../hooks/use-delete-user'
import {ListOfUsers} from '../types'

interface DeleteUserButtonProps {
  id: string | number
}

const DeleteUserButton: FC<DeleteUserButtonProps> = ({id}) => {
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
      }
    }
  })

  return (
    <Button variant="destructive" size="icon" onClick={() => mutate(id)}>
      <MdOutlineClose size={18} />
    </Button>
  )
}

export default DeleteUserButton
