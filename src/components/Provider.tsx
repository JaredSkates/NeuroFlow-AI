'use client';
import React, { Children } from 'react'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

type Props = {
    children: React.ReactNode, // ReactNode allows any valid React Children
}

const queryClient = new QueryClient();

// Provider component to wrap around the app, providing the query client to all components
// Useful to prevent hitting the endpoint multiple times. Use the results from the cache
const Provider = ({children}: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default Provider;