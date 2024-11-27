"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import PlayListSongs from "@/components/PlayListSongs";

export default function PlayListTracks() {
  const queryClient = new QueryClient();

  const { playList } = useParams<{ playList: string }>();

  return (
    <QueryClientProvider client={queryClient}>
      <PlayListSongs playListId={playList} />
    </QueryClientProvider>
  );
}
