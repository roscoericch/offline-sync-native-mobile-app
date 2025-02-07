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
import { useNetInfo } from "@react-native-community/netinfo";

interface AppContextType {
  shipments: shipment[];
  setShipments: (shipment: shipment[]) => void;
  selectedItems: string[];
  updateSelectedItems: (items: string[]) => void;
  createShipment: (item: shipment) => void;
  shipmentStatusList: shipmentStatus[];
  updateShipmentStatusList: (status_list: shipmentStatus[]) => void;
  cancelShipment: (id: string, status: shipmentStatus) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { isInternetReachable } = useNetInfo();
  const [shipments, setShipments] = useState<shipment[]>([]);
  const [shipmentStatus, setShipmentStatus] = useState<shipmentStatus[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const updateShipment = useCallback(
    (shipments: shipment[]) => {
      setShipments([...shipments]);
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
  const createShipment = useCallback(
    (item: shipment) => {
      setShipments((prev) => {
        const currentShipments = [...prev];
        currentShipments.unshift(item);
        return [...currentShipments];
      });
    },
    [setShipments]
  );
  const cancelShipment = useCallback(
    (id: string, status: shipmentStatus) => {
      try {
        setShipments((prev) => {
          const currentShipments = [...prev];
          const currentIndex = currentShipments.findIndex((e) => e.id === id);
          currentShipments[currentIndex] = {
            ...currentShipments[currentIndex],
            status: status,
          };
          return [...currentShipments];
        });
      } catch (error) {
        console.error(error);
      }
    },
    [setShipments]
  );
  useEffect(() => {
    const loadShipments = async () => {
      try {
        const storedShipments = await AsyncStorage.getItem("shipments");
        if (storedShipments) setShipments(JSON.parse(storedShipments));
        else {
          setShipments(seedShipments);
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };
    loadShipments();
  }, []);
  useEffect(() => {
    const saveShipments = async () => {
      try {
        await AsyncStorage.setItem("shipments", JSON.stringify(shipments));
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };
    saveShipments();
  }, [shipments]);
  useEffect(() => {
    //online sync
    if (isInternetReachable) {
      setShipments((prev) => {
        const currentShipment: shipment[] = [
          ...prev.map((e): shipment => {
            if (e.status === "pending") {
              return { ...e, status: "in-progress" };
            } else if (e.status === "sub-cancel") {
              return { ...e, status: "cancelled" };
            } else return e;
          }),
        ];
        return [...currentShipment];
      });
    }
  }, [isInternetReachable, setShipments]);
  const providerValues = useMemo(
    () => ({
      shipments,
      setShipments: updateShipment,
      updateSelectedItems,
      selectedItems,
      updateShipmentStatusList: updateShipmentStatus,
      shipmentStatusList: shipmentStatus,
      createShipment,
      cancelShipment,
    }),
    [
      shipments,
      setShipments,
      updateSelectedItems,
      selectedItems,
      updateShipmentStatus,
      shipmentStatus,
      createShipment,
      cancelShipment,
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
