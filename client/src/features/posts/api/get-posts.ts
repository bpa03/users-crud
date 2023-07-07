import {useQuery} from '@tanstack/react-query'
import {ListOfPosts} from '../types'

async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')

  if (!response.ok) {
    throw new Error('Error on fetch posts')
  }

  const posts = await response.json()
  return posts
}

export const usePosts = () => {
  return useQuery<ListOfPosts>({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
    staleTime: 1000
  })
}
