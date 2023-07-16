import fetch from 'node-fetch'

export async function deleteUser(id: string | number): Promise<unknown> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Error on delete user')
  }

  return response
}
