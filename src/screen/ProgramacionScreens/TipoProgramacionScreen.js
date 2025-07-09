import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ListItem = ({ label, onPress, subItems }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.listItem}
        onPress={subItems?.length ? toggleExpansion : onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.label}>{label}</Text>
        {subItems?.length > 0 && (
          <Icon
            name={isExpanded ? 'expand-less' : 'expand-more'}
            size={26}
            color="#00897B"
            style={styles.icon}
          />
        )}
      </TouchableOpacity>

      {isExpanded && subItems?.length > 0 && (
        <View style={styles.subItemsContainer}>
          {subItems.map((subItem, index) => (
            <TouchableOpacity
              key={index}
              style={styles.subItem}
              onPress={subItem.onPress}
            >
              <Text style={styles.subItemLabel}> {subItem.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const TipoProgramacionScreen = () => {
  const navigation = useNavigation();
  const data = [
    {
      label: 'PROGRAMAR MATERIAS',
      subItems: [
        {/*{ label: 'PROGRAMACION NORMAL', onPress: () => console.log('Programacionnormal') },
        { label: 'CURSOS DE VERANO', onPress: () => console.log('Cursosdeverano') },
        { label: 'MESA DE EXAMEN', onPress: () => console.log('ProgramacionMesaexamen') },
        { label: 'DESPROGRAMACION DE MATERIAS', onPress: () => console.log('ProgramacionMesaexamen') },
         */
     },
        { label: 'NO EXISTEN MATERIAS PARA PROGRAMAR', onPress: () => navigation.navigate('ProgramacionNormal') },
    ],
    },
    {
      label: 'VER MIS NOTAS',
      subItems: [
        { label: 'VER MI PROGRAMACION', onPress: () => navigation.navigate('tablanotas') },
        { label: 'VER NOTAS', onPress: () => navigation.navigate('vernotas') },
      ],
    },  
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Opciones de Programación</Text>
      {data.map((item, index) => (
        <ListItem
          key={index}
          label={item.label}
          onPress={() => console.log(`Pressed: ${item.label}`)}
          subItems={item.subItems}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#37474F',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 17,
    color: '#263238',
    fontWeight: '600',
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  subItemsContainer: {
    marginTop: 10,
    paddingLeft: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
  },
  subItem: {
    paddingVertical: 6,
  },
  subItemLabel: {
    fontSize: 15,
    color: '#37474F',
  },
});

export default TipoProgramacionScreen;