import { useEffect, useState } from "react";
import { getVideos, type Video } from "@/mocks/services/videoService";

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getVideos()
      .then(setVideos)
      .finally(() => setCargando(false));
  }, []);

  return { videos, cargando };
}
