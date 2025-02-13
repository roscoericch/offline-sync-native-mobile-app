import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import NotificationIcon from "@/components/icons/NotificationIcon";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";
import FilterIcon from "@/components/icons/FilterIcon";
import ScanCtaIcon from "@/components/icons/ScanCtaIcon";
import { Collapsible } from "@/components/Collapsible";
import Checkbox from "expo-checkbox";
import FilterPopup from "@/components/FilterPopup";
import { useAppContext } from "@/context/AppContext";
import { shipment } from "@/types";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [searchValue, setSearchValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
  };
  const { shipments, selectedItems, shipmentStatusList, updateSelectedItems } =
    useAppContext();
  // const showErrorAlert = (message: string) => {
  //   Alert.alert("Error", message, [{ text: "OK" }], { cancelable: false });
  // };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.profileImg}
          source={require("@/assets/images/profile.png")}
        />
        <Image source={require("@/assets/images/logo-primary.png")} />
        <TouchableOpacity>
          <NotificationIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.containerPadding}>
        <View>
          <ThemedText style={styles.helloText} type="default">
            Welcome, Jon Doe
          </ThemedText>
        </View>
        <SearchInput
          value={searchValue}
          onQuery={(value) => setSearchValue(value)}
        />
        <View style={styles.btnGroup}>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={[styles.pressableLayout, { backgroundColor: "#F4F2F8" }]}
          >
            <FilterIcon />
            <Text style={styles.greyText}>Filters</Text>
          </Pressable>
          <Pressable
            style={[styles.pressableLayout, { backgroundColor: "#2F50C1" }]}
            onPress={() => router.push("/create-shipment")}
          >
            <ScanCtaIcon />
            <Text style={styles.whiteText}>Add Shipment</Text>
          </Pressable>
        </View>
        <View style={styles.scroolComponent}>
          <View style={styles.scrollHead}>
            <Text style={styles.title}>Shipments</Text>
            <View style={styles.checkBoxGroup}>
              <Checkbox
                color={"#2F50C1"}
                value={
                  shipments.length > 0 &&
                  shipments.every((item) => selectedItems.includes(item?.id))
                }
                onValueChange={(value) => {
                  if (value) {
                    updateSelectedItems([...shipments.map((e) => e?.id)]);
                  } else {
                    updateSelectedItems([]);
                  }
                }}
              />
              <ThemedText type="link">Mark All</ThemedText>
            </View>
          </View>
          <View>
            <FlatList
              data={
                shipmentStatusList.length > 0
                  ? shipments.filter((e) =>
                      shipmentStatusList.includes(e.status)
                    )
                  : shipments
              }
              ListEmptyComponent={
                <View style={styles.emptyListContainer}>
                  <Text>No Shipment Found</Text>
                  <Ionicons size={100} color={"white"} name="sad" />
                </View>
              }
              renderItem={({ item }) => <Collapsible item={item as shipment} />}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => (
                <View style={styles.seperator}></View>
              )}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        </View>
      </View>
      <FilterPopup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 5,
  },
  emptyListContainer: {
    backgroundColor: "#F4F2F8",
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  profileImg: {
    borderRadius: 99,
  },
  profileName: {
    fontSize: 28,
    color: "#000000",
  },
  welcomeText: {
    fontSize: 14,
    color: "#000000",
    opacity: 60,
    fontWeight: "regular",
  },
  containerPadding: {
    paddingHorizontal: 20,
    flex: 1,
    gap: 15,
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
    width: "48%",
  },
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
  greyText: {
    color: "#58536E",
    fontSize: 16,
    fontWeight: "regular",
  },
  whiteText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "regular",
  },
  scrollHead: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  checkBoxGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  seperator: {
    height: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "semibold",
  },
  helloText: {
    fontSize: 14,
    color: "#000000",
    opacity: 60,
    fontWeight: "regular",
  },
  scroolComponent: {
    flex: 1,
    gap: 2,
    paddingBottom: 20,
  },
});
