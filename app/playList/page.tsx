"use client"

import PlayListComponent from "@/components/PlayList";
import {
  useQuery,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function PlayList() {
  return (
    <QueryClientProvider client={queryClient}>
     <PlayListComponent/>
    </QueryClientProvider>
  );
}
