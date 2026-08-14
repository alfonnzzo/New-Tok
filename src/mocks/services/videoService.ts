import videos from "../data/videos.json";

export type Comentario = {
  id: string;
  videoId: string;
  usuario: string;
  texto: string;
  fecha: string;
};

export type Video = {
  id: string;
  url: string;
  autor: string;
  likes: number;
  descripcion: string;
  comentarios: Comentario[];
  fecha: string;
};

/** Simula la latencia de red de un backend real (500-1000 ms). */
export function latenciaSimulada() {
  const ms = 500 + Math.random() * 500;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getVideos(): Promise<Video[]> {
  await latenciaSimulada();
  return videos;
}
