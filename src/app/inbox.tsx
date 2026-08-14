import { StyleSheet, Text, View } from "react-native";

export default function Bandeja() {
  return (
    <View style={styles.contenedor}>
      <Text>Bandeja</Text>
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
