import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProgramacioScreen = () => {
  const navigation = useNavigation();
  const data = [
    { iconName: 'archive', label: 'PROGRAMACION DE MATERIAS', target: 'TipoProgramacion' },
    { iconName: 'article', label: 'KARDEX ACADEMICO', target: 'kardex' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OPCIONES ACADEMICAS</Text>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => navigation.navigate(item.target)}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Icon name={item.iconName} size={30} color="#fff" />
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  iconContainer: {
    backgroundColor: '#00897B',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default ProgramacioScreen;
