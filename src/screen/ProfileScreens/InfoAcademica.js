import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import useFetch from '../../hooks/useFetch';

export default function InfoAcademica() {
  const { perfil } = useFetch();

  if (!perfil) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se pudo cargar la información académica.</Text>
      </View>
    );
  }

  // Formatear fecha de inscripción
  const fechaInscripcion = perfil.fec_inscripcion
    ? new Date(perfil.fec_inscripcion).toLocaleDateString('es-BO', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    : '';

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Facultad:</Text>
          <Text style={styles.tableCell}>{perfil.facultad}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Carrera:</Text>
          <Text style={styles.tableCell}>{perfil.programa}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Dirección:</Text>
          <Text style={styles.tableCell}>{perfil.direccion_carrera}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Colegio de Egreso:</Text>
          <Text style={styles.tableCell}>{perfil.colegio}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Fecha de Inscripción:</Text>
          <Text style={styles.tableCell}>{fechaInscripcion}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
