import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import Checkbox from "expo-checkbox";
import DropdownIcon from "./icons/DropdownIcon";
import { StatusLabel } from "./StatusLabel";
import ArrowIcon from "./icons/ArrowIcon";
import { shipment } from "@/types";
import { useAppContext } from "@/context/AppContext";
import { useNetInfo } from "@react-native-community/netinfo";

export function Collapsible({ item }: { item: shipment }) {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedItems, updateSelectedItems, cancelShipment } =
    useAppContext();
  const { isInternetReachable } = useNetInfo();
  return (
    <ThemedView style={styles.container}>
      <View style={styles.topContent}>
        <Checkbox
          color={"#2F50C1"}
          value={selectedItems.includes(item?.id)}
          onValueChange={(value) => {
            if (value) {
              updateSelectedItems([...selectedItems, item?.id]);
            } else {
              updateSelectedItems([
                ...selectedItems.filter((e) => e !== item?.id),
              ]);
            }
          }}
        />
        <Image style={styles.box} source={require("@/assets/images/box.png")} />
        <View style={styles.topGroup}>
          <Text style={styles.title}>{item.type?.toUpperCase()}</Text>
          <View style={styles.destinationLayout}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.destination}
            >
              {item?.pickup_address}
            </Text>
            <ArrowIcon />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.destination}
            >
              {item?.destination_address}
            </Text>
          </View>
        </View>
        <StatusLabel status={item.status} />
        <TouchableOpacity
          onPress={() => setIsOpen((value) => !value)}
          activeOpacity={0.8}
        >
          <DropdownIcon open={isOpen} />
        </TouchableOpacity>
      </View>
      {isOpen && (
        <ThemedView style={styles.bottomContent}>
          <View style={styles.bottomDestinationLayout}>
            <View style={styles.topGroup}>
              <Text>Origin</Text>
              <Text style={styles.trackingNumber}>{item?.pickup_address}</Text>
              <Text style={styles.title}>{item?.sender_name}</Text>
              <Text style={styles.destination}>{item?.sender_phone}</Text>
            </View>
            <ArrowIcon size={20} />
            <View style={styles.topGroup}>
              <Text>Destination</Text>
              <Text style={styles.trackingNumber}>
                {item?.destination_address}
              </Text>
              <Text style={styles.title}>{item?.receiver_name}</Text>
              <Text style={styles.destination}>{item?.receiver_phone}</Text>
            </View>
          </View>
          <View style={styles.btnGroup}>
            <Pressable
              style={[styles.pressableLayout, { backgroundColor: "#6e83f0" }]}
            >
              <Ionicons size={20} color={"white"} name="call" />
              <Text style={styles.btnText}>Call</Text>
            </Pressable>
            {!["delivered", "cancelled"].includes(item.status) ? (
              <Pressable
                style={[styles.pressableLayout, { backgroundColor: "#ed2d2d" }]}
                onPress={() => {
                  cancelShipment(
                    item.id,
                    isInternetReachable ? "cancelled" : "sub-cancel"
                  );
                }}
              >
                <Ionicons size={20} color={"white"} name="close-circle" />
                <Text style={styles.btnText}>Cancel</Text>
              </Pressable>
            ) : null}
          </View>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F2F8",
    borderRadius: 10,
  },
  topContent: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "space-between",
    backgroundColor: "#F4F2F8",
    borderRadius: 10,
    gap: 10,
  },
  topGroup: {
    display: "flex",
    flex: 1,
  },
  title: {
    color: "#3F395C",
    fontSize: 13,
    fontWeight: "regular",
  },
  trackingNumber: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "#000000",
  },
  destination: {
    color: "#757281",
    fontSize: 13,
    fontWeight: "regular",
  },
  destinationLayout: {
    display: "flex",
    gap: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "45%",
  },
  bottomDestinationLayout: {
    display: "flex",
    gap: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  bottomContent: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F4F2F8",
    borderBottomEndRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    gap: 5,
    borderTopWidth: 2,
    borderTopColor: "#FFFFFF",
    borderStyle: Platform.OS === "ios" ? "solid" : "dashed",
  },
  box: {
    height: 40,
    width: 40,
  },
  pressableLayout: {
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    paddingHorizontal: 24,
    paddingVertical: 6,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "regular",
  },
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
});
