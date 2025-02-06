import * as Yup from "yup";

export const Fields = {
  type: "type",
  sender_phone: "sender_phone",
  sender_phone_number: "sender_phone_number",
  sender_phone_country: "sender_phone_country",
  sender_name: "sender_name",
  receiver_phone: "receiver_phone",
  receiver_phone_number: "receiver_phone_number",
  receiver_phone_country: "receiver_phone_country",
  receiver_name: "receiver_name",
  pickup_address: "pickup_address",
  destination_address: "destination_address",
} as const;

export const initialValues = {
  [Fields.type]: "",
  [Fields.sender_name]: "",
  [Fields.sender_phone]: {
    [Fields.sender_phone_number]: "",
    [Fields.sender_phone_country]: "",
  },
  [Fields.receiver_name]: "",
  [Fields.receiver_phone]: {
    [Fields.receiver_phone_number]: "",
    [Fields.receiver_phone_country]: "",
  },
  [Fields.pickup_address]: "",
  [Fields.destination_address]: "",
};

export const validationSchema = Yup.object().shape({
  [Fields.sender_name]: Yup.string().required("sender name is required"),
  [Fields.sender_phone]: Yup.object().shape({
    [Fields.sender_phone_number]: Yup.string().required(
      "sender phone number is required"
    ),
    [Fields.sender_phone_country]: Yup.string().required(
      "sender phone number is required"
    ),
  }),
  [Fields.receiver_name]: Yup.string().required("receiver name is required"),
  [Fields.receiver_phone]: Yup.object().shape({
    [Fields.receiver_phone_number]: Yup.string().required(
      "sender phone number is required"
    ),
    [Fields.receiver_phone_country]: Yup.string().required(
      "receiver phone number is required"
    ),
  }),
});
