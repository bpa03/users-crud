import {useMutation, UseMutationOptions} from '@tanstack/react-query'
import {createUser} from '../api/create-user'
import {CreateUserDto, User} from '../types'

type UseCreateUserOptions = {
  config?: UseMutationOptions<User, unknown, CreateUserDto, unknown>
}

export default function useCreateUser({config}: UseCreateUserOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: (body: CreateUserDto) => {
      return createUser(body)
    }
  })
}
