'use client'
import {FC} from 'react'
import {usePosts} from '../api/get-posts'

const PostsList: FC<object> = () => {
  const {data, isLoading} = usePosts()

  return (
    <ul>
      {isLoading ? (
        <h1 className="text-4xl font-semibold">Loading...</h1>
      ) : (
        data?.map((post) => <li key={post.id}>{post.title}</li>)
      )}
    </ul>
  )
}

export default PostsList
