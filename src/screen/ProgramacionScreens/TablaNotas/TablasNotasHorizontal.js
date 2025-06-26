import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

const studentData = {
  facultad: '',
  carrera: '',
  ru: '',
  ci: '',
  universitario: '',
  fechaProgramacion: '',
};

const subjectsData = [
  {
    sigla: '',
    materia: '',
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
    sigla: 'SIS939',
    materia: 'INFORMATICA FORENSE',
    grupo: 1,
    '1er_parcial': 80,
    '2do_parcial': 75,
    '3er_parcial': 79,
    prom_parciales: 32,
    prom_practicas: 26,
    prom_laboratorio: 0,
    ex_final: 60,
    prom_ex_final: 18,
    nota_final: 76,
    '2do_turno': 0,
  },
  
];

const TablasNotasHorizontal = () => {
  const renderSubjectItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.siglaColumn]}>{item.sigla}</Text>
      <Text style={[styles.tableCell, styles.materiaColumn]}>{item.materia}</Text>
      <Text style={styles.tableCell}>{item.grupo}</Text>
      <Text style={styles.tableCell}>{item['1er_parcial']}</Text>
      <Text style={styles.tableCell}>{item['2do_parcial']}</Text>
      <Text style={styles.tableCell}>{item['3er_parcial']}</Text>
      <Text style={styles.tableCell}>{item.prom_parciales}</Text>
      <Text style={styles.tableCell}>{item.prom_practicas}</Text>
      <Text style={styles.tableCell}>{item.prom_laboratorio}</Text>
      <Text style={styles.tableCell}>{item.ex_final}</Text>
      <Text style={styles.tableCell}>{item.prom_ex_final}</Text>
      <Text style={styles.tableCell}>{item.nota_final}</Text>
      <Text style={styles.tableCell}>{item['2do_turno']}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>MATERIAS PROGRAMADAS</Text>
      <Text style={styles.subHeader}>GESTION 2/2023</Text>

      <View style={styles.infoContainer}>
        {Object.entries(studentData).map(([key, value]) => (
          <View style={styles.infoRow} key={key}>
            <Text style={styles.infoLabel}>{key.toUpperCase().replace(/_/g, ' ')}:</Text>
            <Text style={styles.infoValue}>{value}</Text>
          </View>
        ))}
      </View>

      <ScrollView horizontal={true}>
        <View>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.siglaColumn]}>SIGLA</Text>
            <Text style={[styles.tableHeaderCell, styles.materiaColumn]}>MATERIA</Text>
            <Text style={styles.tableHeaderCell}>GRUPO</Text>
            <Text style={styles.tableHeaderCell}>1ER PARCIAL</Text>
            <Text style={styles.tableHeaderCell}>2DO PARCIAL</Text>
            <Text style={styles.tableHeaderCell}>3ER PARCIAL</Text>
            <Text style={styles.tableHeaderCell}>PROM. PARCIALES</Text>
            <Text style={styles.tableHeaderCell}>PROM. PRACTICAS</Text>
            <Text style={styles.tableHeaderCell}>PROM. LABORATORIO</Text>
            <Text style={styles.tableHeaderCell}>EX FINAL</Text>
            <Text style={styles.tableHeaderCell}>PROM. EX FINAL</Text>
            <Text style={styles.tableHeaderCell}>NOTA FINAL</Text>
            <Text style={styles.tableHeaderCell}>2DO TURNO</Text>
          </View>
          <FlatList
            data={subjectsData}
            renderItem={renderSubjectItem}
            keyExtractor={(item, index) => item.sigla + index}
            scrollEnabled={false} // Disable FlatList's own scrolling as we have a parent ScrollView
          />
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  infoLabel: {
    fontWeight: '600',
    color: '#666',
    width: 150, // Adjust as needed to align labels
  },
  infoValue: {
    color: '#333',
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e9ecef',
    paddingVertical: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 8,
    width: 80, // Default width for cells
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  tableCell: {
    textAlign: 'center',
    paddingHorizontal: 8,
    color: '#333',
    width: 80, // Default width for cells
  },
  siglaColumn: {
    width: 70, // Specific width for SIGLA column
  },
  materiaColumn: {
    width: 150, // Specific width for MATERIA column
    textAlign: 'left',
  },
});

export default TablasNotasHorizontal;