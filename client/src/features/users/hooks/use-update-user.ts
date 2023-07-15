import {useMutation, UseMutationOptions} from '@tanstack/react-query'
import {updateUser} from '../api/update-user'
import {UpdateUserDto, User} from '../types'

type UpdateUserMutationFnType = {
  body: UpdateUserDto;
  id: number | string;
}

type UseUpdateUserOptions = {
  config?: UseMutationOptions<User, unknown, UpdateUserMutationFnType>
}

export default function useUpdateUser({config}: UseUpdateUserOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: ({body, id}) => {
      return updateUser(body, id)
    }
  })
}