import {ListOfUsers} from '../types'

export async function getUsers() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)

  if (!response.ok) {
    throw new Error('Error on fetch users')
  }

  const users = await response.json()
  return users as ListOfUsers
}
