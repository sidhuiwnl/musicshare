"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlayList } from "@/server/action";
import Image from "next/image";
import Link from "next/link";

export default function PlayListComponent() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["playList"],
    queryFn: getPlayList,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (query.isLoading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  if (query.isError) {
    return <div>Error fetching playlists</div>;
  }

  const playlists = query.data?.data?.items ?? [];

  

  return (
    <div className="p-4 mt-1">
      <h1 className="text-3xl font-extrabold mb-3">PlayList</h1>
      <div className="grid grid-cols-10 md:grid-cols-10 sm:grid-cols-1 gap-6">
        {playlists.map((playlist: any) => (
          <div key={playlist.id}>
            {playlist.images.length > 0 && (
              <Link href={`/playList/${playlist.id}`}>
                <div className="bg-neutral-100 p-4 shadow-sm rounded-md flex flex-col items-center space-y-2">
                 
                  <Image
                    src={playlist.images[0].url}
                    width={120}
                    height={120}
                    alt={playlist.name}
                    className="rounded-sm"
                  />
                  <h2 className="text-sm md:text-base font-medium">
                    {playlist.name}
                  </h2>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
