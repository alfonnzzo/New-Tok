import { StyleSheet, Text, View } from "react-native";

export default function EmptyState({ mensaje }: { mensaje: string }) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.mensaje}>{mensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  mensaje: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
