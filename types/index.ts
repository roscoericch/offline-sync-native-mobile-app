import { TextInputProps } from "react-native";

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
}

export type shipmentType = "express" | "standard";

export type shipmentStatus =
  | "pending" //status for offline state
  | "in-progress" //status for synced
  | "delivered" //status for delivered
  | "cancelled" //status for cancelled synced
  | "sub-cancel"; //status for cancelled offline
