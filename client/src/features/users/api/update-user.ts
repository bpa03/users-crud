import fetch from 'node-fetch'
import {UpdateUserDto, User} from '../types'

export async function updateUser(body: UpdateUserDto, id: string | number): Promise<User> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    throw new Error('Error on update user')
  }

  const user = await response.json()
  return user
}