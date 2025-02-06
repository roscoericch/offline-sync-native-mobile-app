import { TextInputProps } from "react-native";

export interface LoginValue {
  usr: string;
  pwd: string;
}

export interface iconProps {
  color: string;
}

export interface FloatingLabelInputProps extends TextInputProps {
  label: string;
}

export interface SearchInputProps extends TextInputProps {
  onQuery: (value: string) => void;
}

export interface shipment {
  id: string;
  type: shipmentType;
  sender_phone: string;
  sender_name: string;
  receiver_phone: string;
  receiver_name: string;
  pickup_address: string;
  destination_address: string;
  status: shipmentStatus;
  total_fees: number;
  synced: boolean;
}

export type shipmentType = "express" | "standard";

export type shipmentStatus =
  | "pending"
  | "in-progress"
  | "delivered"
  | "cancelled";
