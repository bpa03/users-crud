'use client'
import {FC, useState, ReactNode} from 'react'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'

interface ReactQueryProviderProps {
  children: ReactNode
}

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({children}) => {
  const [client] = useState(new QueryClient())

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default ReactQueryProvider
