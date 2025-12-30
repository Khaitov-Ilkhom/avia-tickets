import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const QueryProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
