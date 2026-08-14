import { StyleSheet, Text, View } from "react-native";

export default function Perfil() {
  return (
    <View style={styles.contenedor}>
      <Text>Perfil</Text>
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
