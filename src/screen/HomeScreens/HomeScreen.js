import React from "react";
import {  View, Image} from "react-native";
import HomeStyle from "./HomeStyle";


const HomeScreen = ({navigation}) => {
    return(
        <View>
            <Image
          style={HomeStyle.img}
            source={require('../../asset/img/uatf.png')}
          />
        </View>
    );
}
export default HomeScreen;