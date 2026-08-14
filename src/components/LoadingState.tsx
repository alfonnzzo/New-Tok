import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingState() {
  return (
    <View style={styles.contenedor}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
