import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Pressable } from 'react-native';
import { Card, Icon, Text } from 'react-native-elements';

const ProgramacionScreen = ({ navigation }) => {
  const renderAnimatedButton = (name, title, screen) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: scaleAnim }] }]}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate(screen)} // ✅ Navega inmediatamente
          style={styles.animatedButton}
        >
          <Icon name={name} type="material-community" color="#fff" size={30} />
          <Text style={styles.buttonTitle}>{title}</Text>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.title}></Card.Title>
      <Card.Divider />
      <View style={styles.buttonContainer}>
        {renderAnimatedButton('timetable', 'PROGRAMACIÓN NORMAL', 'ProgramacionNormal')}
        {renderAnimatedButton('timetable', 'CURSOS DE VERANO', 'Verano')}
        {renderAnimatedButton('timetable', 'MESA DE EXAMEN', 'MesaExamen')}
        {renderAnimatedButton('table-cog', 'PROGRAMACIÓN LABORATORIO', 'Laboratorio')}
        {renderAnimatedButton('table-search', 'VER NOTAS', 'VerNotas')}
        {renderAnimatedButton('table-headers-eye', 'VER MI PROGRAMCIÓN', 'VerProgramacion')}
      </View>
    </Card>
  );
};

const screenWidth = Dimensions.get('window').width;
const buttonSize = (screenWidth - 90) / 2;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    width: buttonSize,
    marginBottom: 20,
  },
  animatedButton: {
    backgroundColor: '#2089dc',
    borderRadius: 20,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default ProgramacionScreen;
