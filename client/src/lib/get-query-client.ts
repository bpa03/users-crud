/* eslint-disable @typescript-eslint/no-explicit-any */
import {QueryClient} from '@tanstack/react-query'
import {cache} from 'react'

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          useErrorBoundary: true,
          refetchOnWindowFocus: false,
          retry: false
        }
      }
    })
)

export default getQueryClient
