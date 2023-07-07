import {ListOfUsers} from '../types'

export async function getUsers(): Promise<ListOfUsers> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'GET'
  })

  if (!response.ok) {
    throw new Error('Error on fetch users')
  }

  const users = await response.json()
  return users
}
