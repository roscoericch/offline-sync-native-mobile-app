import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { View, Text } from "react-native";
import * as Yup from "yup";

const FormField = <T extends Yup.AnyObjectSchema>({
  control,
  name,
  showError = true,
  children,
}: {
  control: Control<Yup.InferType<T>>;
  name: FieldPath<Yup.InferType<T>>;
  showError?: boolean;
  children: ({
    field,
  }: {
    field: ControllerRenderProps<FieldValues, string>;
  }) => React.ReactElement;
}) => {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ fieldState }) => (
          <>
            {children}
            {showError && <Text>{fieldState.error?.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

export default FormField;
