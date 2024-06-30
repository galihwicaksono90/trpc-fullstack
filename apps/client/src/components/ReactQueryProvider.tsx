'use client'
import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { trpc } from "@/utils/trpc"
import { httpBatchLink } from "@trpc/client";

export const ReactQueryProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [client] = React.useState(new QueryClient())
  const [trpcClient] = React.useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
          fetch(url, options) {
            const token = localStorage.getItem('token')
            console.log({ tokennn: token })
            return fetch(url, {
              ...options,
              headers: {
                ...options?.headers,
                authorization: token ? `Bearer ${token}` : '',
              },
            });
          },
        })
      ]
    })
  })
  return (
    <trpc.Provider client={trpcClient} queryClient={client}>
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
