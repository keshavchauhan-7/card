import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen({ route }) {
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {username}!</Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
