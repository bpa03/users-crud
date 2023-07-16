import {useMutation, UseMutationOptions} from '@tanstack/react-query'
import {deleteUser} from '../api/delete-user'

type UseDeleteMutationOptions = {
  config?: UseMutationOptions<unknown, Error, string | number>
}

export default function useDeleteUser({config}: UseDeleteMutationOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: (id) => {
      return deleteUser(id)
    }
  })
}