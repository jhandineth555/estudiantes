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
  const fechaNacimiento = perfil.fec_nacimiento
    ? new Date(perfil.fec_nacimiento).toLocaleDateString('es-BO', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    : '';
  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>NOMBRE:</Text>
          <Text style={styles.tableCell}>{perfil.nombres}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>APELLIDO PATERNO:</Text>
          <Text style={styles.tableCell}>{perfil.paterno}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>APELLIDO MATERNO:</Text>
          <Text style={styles.tableCell}>{perfil.materno}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>C.I.:</Text>
          <Text style={styles.tableCell}>{perfil.nro_dip}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>R.U.:</Text>
          <Text style={styles.tableCell}>{perfil.id_alumno}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Fecha de Nacimiento:</Text>
          <Text style={styles.tableCell}>{fechaNacimiento}</Text>
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
          <Text style={styles.tableCell}>{perfil.tel_per}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Email:</Text>
          <Text style={styles.tableCell}>{perfil.email}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Tipo Sanguíneo:</Text>
          <Text style={styles.tableCell}>{perfil.des_sanguineo}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Tel. Whatsapp:</Text>
          <Text style={styles.tableCell}>{perfil.tel_whatsapp}</Text>
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