import { shipment, shipmentStatus, shipmentType } from "@/types";

export const seedShipments: shipment[] = [
  {
    id: "1",
    type: "standard",
    sender_phone: "+2347013879246",
    sender_name: "will wheaton",
    receiver_phone: "+2347013879248",
    receiver_name: "mike ross",
    pickup_address: "12 central city",
    destination_address: "Broadway avenue",
    status: "pending",
    total_fees: 27000,
  },
  {
    id: "2",
    type: "express",
    sender_phone: "+2347013879246",
    sender_name: "will wheaton",
    receiver_phone: "+2347013879248",
    receiver_name: "mike ross",
    pickup_address: "12 central city",
    destination_address: "Broadway avenue",
    status: "pending",
    total_fees: 27000,
  },
];

export const statusList: { title: string; value: shipmentStatus }[] = [
  { title: "Pending", value: "pending" },
  { title: "In Progress", value: "in-progress" },
  { title: "Delivered", value: "delivered" },
  { title: "Cancelled", value: "cancelled" },
];

export const shipmentTypeList: { label: string; value: shipmentType }[] = [
  { label: "Standard", value: "standard" },
  { label: "Express", value: "express" },
];
