/* eslint-disable @typescript-eslint/no-explicit-any */
import {QueryClient, UseQueryOptions, UseMutationOptions} from '@tanstack/react-query'
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

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Promise<
  ReturnType<FnType>
>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;

export default getQueryClient
