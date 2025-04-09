import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import useFetch from '../../hooks/useFetch';

const InformacionPerfil = () => {
  const { perfil } = useFetch();
  if (!perfil) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se pudo cargar la información académica.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Nombre:</Text>
          <Text style={styles.tableCell}>{perfil.nombre}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Apellido Paterno:</Text>
          <Text style={styles.tableCell}>{perfil.ap_paterno}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Apellido Materno:</Text>
          <Text style={styles.tableCell}>{perfil.ap_materno}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>C.I.:</Text>
          <Text style={styles.tableCell}>{perfil.ci}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>R.U.:</Text>
          <Text style={styles.tableCell}>{perfil.ru_e}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Fecha de Nacimiento:</Text>
          <Text style={styles.tableCell}>{perfil.fech_nacimiento}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Dirección:</Text>
          <Text style={styles.tableCell}>{perfil.direccion}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Zona:</Text>
          <Text style={styles.tableCell}>{perfil.zona}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Teléfono Personal:</Text>
          <Text style={styles.tableCell}>{perfil.telefono}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Email:</Text>
          <Text style={styles.tableCell}>{perfil.email}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Tipo Sanguíneo:</Text>
          <Text style={styles.tableCell}>{perfil.tip_sangre}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Tel. Whatsapp:</Text>
          <Text style={styles.tableCell}>{perfil.num_wasap}</Text>
        </View>
      </View>
    </View>
  );
};

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
    fontSize: 15,
    color: '#333',
  },
});

export default InformacionPerfil;
