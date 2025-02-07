import * as Yup from "yup";

export const Fields = {
  type: "type",
  sender_phone: "sender_phone",
  sender_name: "sender_name",
  receiver_phone: "receiver_phone",
  receiver_name: "receiver_name",
  pickup_address: "pickup_address",
  destination_address: "destination_address",
} as const;

export const initialValues = {
  [Fields.type]: "standard",
  [Fields.sender_name]: "",
  [Fields.sender_phone]: "",
  [Fields.receiver_name]: "",
  [Fields.receiver_phone]: "",
  [Fields.pickup_address]: "",
  [Fields.destination_address]: "",
};

export const validationSchema = Yup.object().shape({
  [Fields.sender_name]: Yup.string()
    .required("sender name is required")
    .min(3, "name should be a minimum 3 characters"),
  [Fields.sender_phone]: Yup.string().required(
    "sender phone number is required"
  ),
  [Fields.receiver_name]: Yup.string()
    .required("receiver name is required")
    .min(3, "name should be a minimum 3 characters"),
  [Fields.receiver_phone]: Yup.string().required(
    "sender phone number is required"
  ),
  [Fields.pickup_address]: Yup.string().required("pick up address is required"),
  [Fields.destination_address]: Yup.string().required(
    "destination address is required"
  ),
  [Fields.type]: Yup.string().required("delivery type is required"),
});
