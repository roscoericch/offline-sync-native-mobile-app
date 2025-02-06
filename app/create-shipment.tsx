import { KeyboardAvoidingView, Platform } from "react-native";

export default function CreateShipmentScreen() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    ></KeyboardAvoidingView>
  );
}
