import {CreateUserDto, User} from '../types'

export async function createUser(body: CreateUserDto): Promise<User> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    throw new Error('Error on create user')
  }

  const user = await response.json()
  return user
}
