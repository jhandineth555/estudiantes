import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Dimensions, Image, Animated } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import InformacionPerfil from './InformacionPerfil';
import InfoAcademica from './InfoAcademica';
import LugarPerfil from './LugarPerfil';
import ProfileStyle from './ProfileStyle';
import NavigationStyles from '../../navigation/NavigationStyles';
import useFetch from '../../hooks/useFetch';


const renderScene = SceneMap({
  info: InformacionPerfil,
  infoacademica: InfoAcademica,
  lugar: LugarPerfil,
});
const ProfileScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [imageUri, setImageUri] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const navigation = useNavigation();
  const { perfil } = useFetch();
  const { infoacademica } = useFetch();
  const [routes] = useState([
    { key: 'info', title: 'INFORMACION ESTUDIANTE' },
    { key: 'infoacademica', title: 'INFORMACION ACADEMICA' },
    { key: 'lugar', title: 'INFORMACION LOCALIDAD' },
  ]);

  useEffect(() => {
    const fetchImage = async () => {
      const uri = await AsyncStorage.getItem('profileImage');
      setImageUri(uri);
    };
    fetchImage();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: NavigationStyles.tabBarStyle });
      return () => {}; 
    }, [navigation])
  );

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      if (value > lastScrollY.current) {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
      } else {
        navigation.getParent()?.setOptions({ tabBarStyle: NavigationStyles.tabBarStyle });
      }
      lastScrollY.current = value;
    });

    return () => scrollY.removeAllListeners();
  }, [navigation]);
  const ruE = perfil ? perfil.ru_e : '';
  const ca = infoacademica ? infoacademica.carrera : '';
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Animated.ScrollView 
        style={{ flex: 1 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <Text style={ProfileStyle.centeredText}>CARRERA: {ca}</Text>
          {imageUri ? (
            <Image source={{ uri: `file://${imageUri}` }} style={ProfileStyle.avatar} />
          ) : (
            <Avatar
              size="xlarge"
              rounded
              source={require('../../asset/img/avatar.png')}
              containerStyle={ProfileStyle.avatar}
            />
          )}
          <Text style={{ marginTop: 10, color: 'black', textAlign: 'center' }}>R.U.: {ruE}</Text>
          <Text style={ProfileStyle.centeredText}>INFORMACION{"\n"}</Text>
        </View>

        <View style={ProfileStyle.container2}>
          <TouchableOpacity
            style={ProfileStyle.button}
            onPress={() => navigation.navigate('Update')}
          >
            <Text style={{ color: 'white' }}>REGISTRAR TELEFONO Y EMAIL</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{ height: Dimensions.get('window').height }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
}
export default ProfileScreen;
