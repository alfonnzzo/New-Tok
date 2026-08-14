import { useState } from "react";
import { FlatList } from "react-native";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
import VideoCard from "@/components/VideoCard";
import { useVideos } from "@/hooks/useVideos";

export default function Inicio() {
  const { videos, cargando } = useVideos();
  const [alto, setAlto] = useState(0);

  if (cargando) return <LoadingState />;
  if (videos.length === 0) return <EmptyState mensaje="No hay videos disponibles" />;

  return (
    <FlatList
      data={videos}
      keyExtractor={(video) => video.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onLayout={(e) => setAlto(e.nativeEvent.layout.height)}
      renderItem={({ item }) => <VideoCard video={item} alto={alto} />}
    />
  );
}
