import { useState, useEffect } from "react";
import { getPlayListTracks } from "@/server/action";
import Image from "next/image";
import { createSwapy } from "swapy";
import { GripHorizontal } from "lucide-react";

interface Song {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
  };
  artists: { name: string }[];
}

export default function PlayListSongs({ playListId }: { playListId: string }) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setIsLoading(true);
        const response = await getPlayListTracks(playListId);
        const items = response.data?.items ?? [];
        const mappedSongs = items.map((item: any) => item.track) as Song[];
        setSongs(mappedSongs);
      } catch (err: any) {
        setError(err.message || "Failed to fetch playlist tracks");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [playListId]);

  useEffect(() => {
    const container = document.querySelector(".container");

    if (container) {
      const swapy = createSwapy(container, {
        animation: "dynamic",
      });
      swapy.enable(true);

      swapy.onSwap(({data}) =>{
        console.log('swap', data.array);
      })

      

      return () => {
        swapy.destroy();
      };
    }
  }, [songs]);

  if (isLoading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container flex flex-col gap-4 p-4 mt-4">
      <button>Game of thrones</button>
      {songs.map((song, index) => (
        <div key={index} data-swapy-slot={song.id} className="mb-3">
          <div
            data-swapy-item={song.name}
            className="flex space-x-4 items-center  bg-neutral-200 w-[1000px] p-2 rounded-md "
          >
            <GripHorizontal />
            {song.album?.images?.[0]?.url ? (
              <Image

                src={song.album.images[0].url}
                alt={`${song.name} album cover`}
                width={50}
                height={50}
                className="rounded-sm mb-2 "
              />
            ) : (
              "No album cover"
            )}
            <div>
              <h1 className="font-semibold">{song.name || "Unknown Song"}</h1>
              <p className="font-medium text-sm">{song.artists[0].name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
