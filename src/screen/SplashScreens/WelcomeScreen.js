import React, { useEffect, useRef } from "react";
import { View, ImageBackground, Animated } from "react-native";
import WelcomeStyle from "./WelcomeStyle";

const WelcomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 1000, 
      useNativeDriver: true,
    }).start(() => {
     
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0, 
          duration: 2000, 
          useNativeDriver: true,
        }).start(() => {
          navigation.navigate("AuthSave"); 
        });
      }, 3000);
    });
  }, [navigation, fadeAnim]);

  return (
    <Animated.View style={[WelcomeStyle.overlay, { opacity: fadeAnim }]}>
      <ImageBackground
        source={require("../../asset/img/OIP.jpeg")}
        style={WelcomeStyle.background}
      />
    </Animated.View>
  );
};

export default WelcomeScreen;
