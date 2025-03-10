'use client';
import React, { Children } from 'react'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

type Props = {
    children: React.ReactNode, // ReactNode allows any valid React Children
}

const queryClient = new QueryClient();

// Provider component to wrap around the app or the body, providing the query client to all components
// Useful to prevent hitting the endpoint multiple times. Store results in cache then refetch when needed.
const Provider = ({children}: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default Provider;