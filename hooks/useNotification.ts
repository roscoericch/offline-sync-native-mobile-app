import { useCallback } from "react";
import { Alert } from "react-native";

const useNotification = () => {
  const showErrorAlert = useCallback((message: string) => {
    Alert.alert("Error", message, [{ text: "OK" }], { cancelable: true });
  }, []);
  const showSuccessAlert = useCallback((message: string) => {
    Alert.alert("Success", message, [{ text: "OK" }], { cancelable: true });
  }, []);
  return { showErrorAlert, showSuccessAlert };
};

export default useNotification;
