import { StyleSheet, Pressable, View, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useForm } from "react-hook-form";
import { useNetInfo } from "@react-native-community/netinfo";
import { FloatingLabelInput } from "@/components/FloatingLabelInput";
import { router } from "expo-router";
import axios from "@/api/axios";
import { ThemedView } from "./ThemedView";
import * as FormMeta from "@/components/form/validators/create-shipment";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "./form/FormField";
import PhoneInput, {
  ICountry,
  isValidPhoneNumber,
} from "react-native-international-phone-number";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import uuid from "react-native-uuid";
import { shipmentTypeList } from "@/constants";
import { shipmentType } from "@/types";
import useNotification from "@/hooks/useNotification";

export default function ShipmentForm() {
  const { validationSchema, initialValues, Fields } = FormMeta;
  const { showErrorAlert } = useNotification();
  const { isInternetReachable } = useNetInfo();
  const { createShipment } = useAppContext();
  const { control, handleSubmit, formState, setError, setValue, reset } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: initialValues,
      mode: "all",
    });
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    sender?: ICountry | undefined;
    receiver?: ICountry | undefined;
  }>();
  const handleCreateAction = (data: Yup.InferType<typeof validationSchema>) => {
    try {
      if (isInternetReachable) {
        setLoading(true);
        axios
          .get<string, { data: Record<string, string>[] }>("/users") //simulate network request
          .then(() => {
            createShipment({
              ...data,
              sender_phone:
                selectedCountry?.sender?.callingCode + data.sender_phone,
              receiver_phone:
                selectedCountry?.receiver?.callingCode + data.receiver_phone,
              status: "in-progress",
              id: uuid.v4(),
              total_fees: 3000,
              type: data.type as shipmentType,
            });
          })
          .catch((err) => {
            throw Error(err);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        createShipment({
          ...data,
          status: "pending",
          id: uuid.v4(),
          total_fees: 3000,
          type: data.type as shipmentType,
        });
      }
      reset();
      router.back();
    } catch (error: unknown) {
      showErrorAlert((error as Error)?.message || "Something went wrong");
    }
  };
  return (
    <ThemedView style={styles.container}>
      <View style={styles.formView}>
        <ThemedText style={styles.headerText} type="title">
          Create Shipment
        </ThemedText>
        <FormField<typeof validationSchema>
          control={control}
          name={Fields.type}
          render={({ field: { value } }) => (
            <SegmentedControl
              onChange={(e) => {
                setValue(
                  Fields.type,
                  shipmentTypeList[e.nativeEvent.selectedSegmentIndex]
                    .value as shipmentType,
                  { shouldValidate: true, shouldTouch: true, shouldDirty: true }
                );
              }}
              values={shipmentTypeList.map((e) => e.label)}
              selectedIndex={shipmentTypeList.findIndex(
                (e) => e.value === value
              )}
            />
          )}
        />
        <FormField<typeof validationSchema>
          control={control}
          name={Fields.sender_name}
          render={({ field: { onBlur, onChange, value } }) => (
            <FloatingLabelInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value as string}
              label="Sender Name"
            />
          )}
        />
        <FormField<typeof validationSchema>
          control={control}
          name={Fields.pickup_address}
          render={({ field: { onBlur, onChange, value } }) => (
            <FloatingLabelInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value as string}
              label="Pickup Address"
            />
          )}
        />
        <FormField<typeof validationSchema>
          control={control}
          name={Fields.sender_phone}
          render={({ field: { onBlur, value } }) => (
            <PhoneInput
              placeholder="Sender Phone Number"
              onBlur={onBlur}
              onChangePhoneNumber={(e) => {
                setValue(Fields.sender_phone, e, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: isValidPhoneNumber(
                    e,
                    selectedCountry?.sender!
                  ),
                });
                if (
                  selectedCountry?.sender &&
                  !isValidPhoneNumber(e, selectedCountry.sender)
                ) {
                  setError(Fields.sender_phone, {
                    message: "invalid phone number",
                  });
                } else if (
                  selectedCountry?.sender &&
                  isValidPhoneNumber(e, selectedCountry.sender)
                ) {
                  setError(Fields.sender_phone, { message: "" });
                }
              }}
              onChangeSelectedCountry={(country: ICountry) => {
                setSelectedCountry((prev) => ({
                  ...prev,
                  sender: country,
                }));
              }}
              defaultCountry="NG"
              selectedCountry={selectedCountry?.sender}
              value={value}
            />
          )}
        />
        <FormField<typeof validationSchema>
          control={control}
          name={Fields.receiver_name}
          render={({ field: { onBlur, onChange, value } }) => (
            <FloatingLabelInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value as string}
              label="Receiver Name"
            />
          )}
        />
        <FormField<typeof validationSchema>
          control={control}
          name={Fields.destination_address}
          render={({ field: { onBlur, onChange, value } }) => (
            <FloatingLabelInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value as string}
              label="Destination Address"
            />
          )}
        />
        <FormField<typeof validationSchema>
          control={control}
          name={Fields.receiver_phone}
          render={({ field: { onBlur, onChange, value } }) => (
            <PhoneInput
              placeholder="Receiver Phone Number"
              onBlur={onBlur}
              onChangePhoneNumber={(e) => {
                setValue(Fields.receiver_phone, e, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: isValidPhoneNumber(
                    e,
                    selectedCountry?.receiver!
                  ),
                });
                if (
                  selectedCountry?.receiver &&
                  !isValidPhoneNumber(e, selectedCountry.receiver)
                ) {
                  setError(Fields.receiver_phone, {
                    message: "invalid phone number",
                  });
                } else if (
                  selectedCountry?.receiver &&
                  isValidPhoneNumber(e, selectedCountry.receiver)
                ) {
                  setError(Fields.receiver_phone, { message: "" });
                }
              }}
              onChangeSelectedCountry={(country: ICountry) => {
                setSelectedCountry((prev) => ({
                  ...(prev ?? {}),
                  receiver: country,
                }));
              }}
              selectedCountry={selectedCountry?.receiver}
              defaultCountry="NG"
              value={value}
            />
          )}
        />
      </View>
      <Pressable
        onPress={handleSubmit(handleCreateAction)}
        disabled={!formState.isValid}
        style={[
          styles.button,
          { backgroundColor: formState.isValid ? "#2F50C1" : "#EAE7F2" },
        ]}
      >
        {loading ? (
          <ActivityIndicator size={"small"} />
        ) : (
          <ThemedText
            style={[
              styles.buttonText,
              { color: formState.isValid ? "#FFFFFF" : "#A7A3B3" },
            ]}
          >
            Submit
          </ThemedText>
        )}
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    height: "100%",
  },
  headerText: {
    color: "#2F50C1",
    fontSize: 34,
    fontWeight: 800,
    marginBottom: 8,
    textAlign: "center",
    paddingTop: 4,
  },
  formView: {
    flex: 1,
    display: "flex",
    marginBottom: "auto",
    backgroundColor: "transparent",
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",
    gap: 5,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    padding: 14,
    justifyContent: "flex-end",
    alignContent: "center",
    alignSelf: "flex-end",
    textAlign: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});
