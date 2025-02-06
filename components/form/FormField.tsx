import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldPath,
} from "react-hook-form";
import { View, Text } from "react-native";
import * as Yup from "yup";

const FormField = <T extends Yup.AnyObjectSchema>({
  control,
  name,
  showError = true,
  render,
}: {
  control: Control<Yup.InferType<T>>;
  name: FieldPath<Yup.InferType<T>>;
  showError?: boolean;
  render: ({
    field,
  }: {
    field: ControllerRenderProps<Yup.Asserts<T>, FieldPath<Yup.Asserts<T>>>;
  }) => React.ReactElement;
}) => {
  return (
    <View style={{ paddingBottom: 12 }}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            {render({ field })}
            {showError && fieldState.error?.message && (
              <Text style={{ color: "#ff0000" }}>
                {fieldState.error?.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default FormField;
