import React, { useState, useCallback } from "react";
import {
  View,
  Image,
  BackHandler,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import HomeStyle from "./HomeStyle";

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => subscription.remove();
    }, [])
  );

  return (
    <ScrollView
      contentContainerStyle={HomeStyle.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Image
        style={HomeStyle.img}
        source={require("../../asset/img/uatf.png")}
        resizeMode="contain"
      />
    </ScrollView>
  );
};

export default HomeScreen;
