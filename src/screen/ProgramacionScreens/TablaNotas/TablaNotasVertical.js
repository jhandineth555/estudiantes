import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

const profileData = {
  nombre: 'Juan Pérez',
  carrera: 'Ingeniería de Sistemas',
  facultad: 'Ciencias y Tecnología',
  gestion: '2025',
};

const materias = [
  {
    tipo: 'NORMAL',
    sigla: 'OPT015',
    materia: 'ETICA PROFESIONAL',
    grupo: 1,
    '1er_parcial': 30,
    '2do_parcial': 77,
    '3er_parcial': 42,
    prom_parciales: 24,
    prom_practicas: 19,
    prom_laboratorio: 0,
    ex_final: 43,
    prom_ex_final: 13,
    nota_final: 56,
    '2do_turno': 0,
  },
  {
    tipo: 'NORMAL',
    sigla: 'SIS123',
    materia: 'BASE DE DATOS II',
    grupo: 2,
    '1er_parcial': 70,
    '2do_parcial': 68,
    '3er_parcial': 55,
    prom_parciales: 64,
    prom_practicas: 70,
    prom_laboratorio: 60,
    ex_final: 75,
    prom_ex_final: 70,
    nota_final: 78,
    '2do_turno': 0,
  },
];

const TablasNotasVertical = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Perfil del estudiante */}
      <Card containerStyle={styles.perfilCard}>
        <Text style={styles.perfilTitle}>PERFIL DEL ESTUDIANTE</Text>
        <Text style={styles.perfilItem}>NOMBRE: <Text style={styles.perfilValue}>{profileData.nombre}</Text></Text>
        <Text style={styles.perfilItem}>CARRERA: <Text style={styles.perfilValue}>{profileData.carrera}</Text></Text>
        <Text style={styles.perfilItem}>FACULTAD: <Text style={styles.perfilValue}>{profileData.facultad}</Text></Text>
        <Text style={styles.perfilItem}>GESTIÓN: <Text style={styles.perfilValue}>{profileData.gestion}</Text></Text>
      </Card>

      {/* Materias */}
      {materias.map((m, index) => (
        <Card key={index} containerStyle={styles.card}>
          <View style={styles.row}><Text style={styles.label}>TIPO</Text><Text style={styles.value}>{m.tipo}</Text></View>
          <View style={styles.row}><Text style={styles.label}>SIGLA</Text><Text style={styles.value}>{m.sigla}</Text></View>
          <View style={styles.row}><Text style={styles.label}>MATERIA</Text><Text style={styles.value}>{m.materia}</Text></View>
          <View style={styles.row}><Text style={styles.label}>GRUPO</Text><Text style={styles.value}>{m.grupo}</Text></View>
          <View style={styles.row}><Text style={styles.label}>1ER PARCIAL</Text><Text style={styles.value}>{m['1er_parcial']}</Text></View>
          <View style={styles.row}><Text style={styles.label}>2DO PARCIAL</Text><Text style={styles.value}>{m['2do_parcial']}</Text></View>
          <View style={styles.row}><Text style={styles.label}>3ER. PARCIAL</Text><Text style={styles.value}>{m['3er_parcial']}</Text></View>
          <View style={styles.row}><Text style={styles.label}>PROM. PARCIALES</Text><Text style={styles.value}>{m.prom_parciales}</Text></View>
          <View style={styles.row}><Text style={styles.label}>PROM. PRÁCTICAS</Text><Text style={styles.value}>{m.prom_practicas}</Text></View>
          <View style={styles.row}><Text style={styles.label}>PROM. LABORATORIO</Text><Text style={styles.value}>{m.prom_laboratorio}</Text></View>
          <View style={styles.row}><Text style={styles.label}>EX FINAL</Text><Text style={styles.value}>{m.ex_final}</Text></View>
          <View style={styles.row}><Text style={styles.label}>PROM. EX FINAL</Text><Text style={styles.value}>{m.prom_ex_final}</Text></View>
          <View style={styles.row}>
            <Text style={styles.label}>NOTA FINAL</Text>
            <Text style={[styles.value, m.nota_final >= 51 ? styles.green : styles.red]}>{m.nota_final}</Text>
          </View>
          <View style={styles.row}><Text style={styles.label}>2DO TURNO</Text><Text style={styles.value}>{m['2do_turno']}</Text></View>
        </Card>
      ))}

      {/* Espacio final */}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eef5f5',
    flex: 1,
    padding: 10,
    paddingBottom: 40, // Espacio inferior
  },
  perfilCard: {
    borderRadius: 6,
    backgroundColor: '#fefefe',
    borderColor: '#ccecec',
    padding: 15,
    marginBottom: 15,
    elevation: 2, // Sombra Android
  },
  perfilTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#008080',
    marginBottom: 10,
  },
  perfilItem: {
    fontSize: 14,
    marginBottom: 5,
    color: '#444',
  },
  perfilValue: {
    fontWeight: 'bold',
    color: '#222',
  },
  card: {
    borderRadius: 6,
    padding: 0,
    backgroundColor: '#f0fafa',
    borderColor: '#ccecec',
    marginBottom: 20,
    elevation: 2, // Sombra Android
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomColor: '#d4e7e7',
    borderBottomWidth: 1,
  },
  label: {
    flex: 1.3,
    fontWeight: 'bold',
    color: '#2e6d6d',
    textTransform: 'uppercase',
  },
  value: {
    flex: 1,
    textAlign: 'right',
    color: '#333',
    fontWeight: '500',
  },
  green: {
    color: '#009933',
    fontWeight: 'bold',
  },
  red: {
    color: '#cc0000',
    fontWeight: 'bold',
  },
});

export default TablasNotasVertical;
