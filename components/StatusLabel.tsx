import { shipmentStatus } from "@/types";
import { Text, StyleSheet, View } from "react-native";

export type StatusLabelProps = {
  status: shipmentStatus;
};

export function StatusLabel({ status }: StatusLabelProps) {
  return (
    <View style={[styles.container, { backgroundColor: "#D9E6FD" }]}>
      <Text style={[styles.text, { color: "#58536E" }]}>
        {status?.toLocaleUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
    opacity: 100,
    zIndex: 1,
  },
  container: {
    borderRadius: 4,
    height: 23,
    width: 66,
    padding: 4,
    opacity: 0.4,
  },
});
