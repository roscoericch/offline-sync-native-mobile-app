import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TextInputProps,
  TextStyle,
} from "react-native";

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
}

export function FloatingLabelInput({
  label,
  value,
  onChangeText,
  secureTextEntry,
  onBlur,
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle: Animated.WithAnimatedObject<TextStyle> = {
    position: "absolute",
    left: 10,
    top: animatedLabel.interpolate({
      inputRange: [-40, 2],
      outputRange: [32, 10],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 10],
    }),
    color: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: ["#000", "#000"],
    }),
    zIndex: 1,
  };

  return (
    <View style={styles.inputContainer}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: isFocused ? "#2F50C1" : "#F4F2F8" },
        ]}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          onBlur?.(e);
          setIsFocused(false);
        }}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        cursorColor={"#000000"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    paddingTop: 1,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 12,
    backgroundColor: "#F4F2F8",
    width: "100%",
    tintColor: "#2F50C1",
    color: "#2F50C1",
    zIndex: 0,
  },
});
