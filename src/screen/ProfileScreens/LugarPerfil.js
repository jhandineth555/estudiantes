import React, { use, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import useFetch from '../../hooks/useFetch';


const LugarPerfil = () => {
  const { lugar } = useFetch();
  
  if (!lugar) {
          return (
              <View style={styles.container}>
                  <Text style={styles.errorText}>No se pudo cargar la información del perfil.</Text>
              </View>
          );
      }
  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Pais: </Text>
          <Text style={styles.tableCell}>{lugar.pais}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Departamento:</Text>
          <Text style={styles.tableCell}>{lugar.departamento}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Provincia:</Text>
          <Text style={styles.tableCell}>{lugar.provincia}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Localidad:</Text>
          <Text style={styles.tableCell}>{lugar.localidad}</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
export default LugarPerfil;