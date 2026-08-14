import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import type { Video } from "@/mocks/services/videoService";

export default function VideoCard({ video, alto }: { video: Video; alto: number }) {
  return (
    <View style={[styles.contenedor, { height: alto }]}>
      <Image source={video.url} style={StyleSheet.absoluteFill} contentFit="cover" />
      <View style={styles.info}>
        <Text style={styles.autor}>{video.autor}</Text>
        <Text style={styles.descripcion}>{video.descripcion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: "100%",
    backgroundColor: "#000",
    justifyContent: "flex-end",
  },
  info: {
    padding: 16,
    paddingRight: 80,
    gap: 6,
  },
  autor: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.75)",
    textShadowRadius: 4,
  },
  descripcion: {
    color: "#fff",
    fontSize: 14,
    textShadowColor: "rgba(0,0,0,0.75)",
    textShadowRadius: 4,
  },
});
