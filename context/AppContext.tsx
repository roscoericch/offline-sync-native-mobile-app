// context/AppContext.tsx
import { shipment, shipmentStatus } from "@/types";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { seedShipments } from "@/constants";

interface AppContextType {
  shipments: shipment[];
  setShipments: (shipment: shipment[]) => void;
  selectedItems: string[];
  updateSelectedItems: (items: string[]) => void;
  shipmentStatusList: shipmentStatus[];
  updateShipmentStatusList: (status_list: shipmentStatus[]) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [shipments, setShipments] = useState<shipment[]>(seedShipments);
  const [shipmentStatus, setShipmentStatus] = useState<shipmentStatus[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const updateShipment = useCallback(
    (shipments: shipment[]) => {
      setShipments(shipments);
    },
    [setShipments]
  );
  const updateSelectedItems = useCallback(
    (items: string[]) => {
      setSelectedItems(items);
    },
    [setSelectedItems]
  );
  const updateShipmentStatus = useCallback(
    (items: shipmentStatus[]) => {
      setShipmentStatus(items);
    },
    [setShipmentStatus]
  );
  useEffect(() => {
    const loadShipments = async () => {
      try {
        const storedShipments = await AsyncStorage.getItem("shipments");
        if (storedShipments) setShipments(JSON.parse(storedShipments));
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };
    loadShipments();
  }, []);
  const providerValues = useMemo(
    () => ({
      shipments,
      setShipments: updateShipment,
      updateSelectedItems,
      selectedItems,
      updateShipmentStatusList: updateShipmentStatus,
      shipmentStatusList: shipmentStatus,
    }),
    [
      shipments,
      setShipments,
      updateSelectedItems,
      selectedItems,
      updateShipmentStatus,
      shipmentStatus,
    ]
  );
  return (
    <AppContext.Provider value={providerValues}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const appContext = React.useContext(AppContext);

  if (!appContext) {
    throw Error("Component needs to be a descendant of AppProvider");
  }

  return appContext;
};
