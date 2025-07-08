import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Card } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown";
import useFetch from "../../hooks/useFetch";

// Opciones de períodos simulados con "Programación"
const opcionesBase = [
  { label: "1/2014", value: "1_2014" },
  { label: "2/2014", value: "2_2014" },
  { label: "1/2015", value: "1_2015" },
  { label: "2/2015", value: "2_2015" },
];

const opciones = opcionesBase.map(op => ({
  ...op,
  label: `Programación - ${op.label}`
}));

// Datos simulados por período
const datosPorPeriodo = {
  '1_2014': [
    {
      tipo: "NORMAL",
      sigla: "OPT015",
      materia: "ÉTICA PROFESIONAL",
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
  ],
  '2_2014': [
    {
      tipo: "NORMAL",
      sigla: "SIS123",
      materia: "BASE DE DATOS II",
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
  ],
};

const VerNotasScreen = () => {
  const { perfil } = useFetch();
  const [periodo, setPeriodo] = useState(null);
  const materias = datosPorPeriodo[periodo] || [];

  const nombre = perfil?.nombres || "";
  const ap_paterno = perfil?.paterno || "";
  const ap_materno = perfil?.materno || "";
  const carrera = perfil?.programa || "";
  const facultad = perfil?.facultad || "";
  const gestion = perfil?.gestion || "";

  return (
    <ScrollView style={styles.container}>

      {/* Subtítulo visible solo si no se ha seleccionado período */}
      {!periodo && (
        <View style={styles.subtituloContainer}>
          <Text style={styles.subtituloTitulo}>Mis Notas</Text>
          <Text style={styles.subtituloDescripcion}>
            - Seleccione la Gestión y el Período para ver sus Notas
          </Text>
        </View>
      )}

      {/* Dropdown visible siempre */}
      <Dropdown
        style={styles.dropdown}
        data={opciones}
        labelField="label"
        valueField="value"
        placeholder="Seleccione Gestión y período"
        value={periodo}
        onChange={(item) => setPeriodo(item.value)}
      />

      {/* Mostrar solo si se seleccionó un período */}
      {periodo && (
        <>
          {/* Perfil */}
          <Card containerStyle={styles.perfilCard}>
            <Text style={styles.perfilTitle}>PERFIL DEL ESTUDIANTE</Text>
            <Text style={styles.perfilItem}>NOMBRE: <Text style={styles.perfilValue}>{nombre} {ap_paterno} {ap_materno}</Text></Text>
            <Text style={styles.perfilItem}>CARRERA: <Text style={styles.perfilValue}>{carrera}</Text></Text>
            <Text style={styles.perfilItem}>FACULTAD: <Text style={styles.perfilValue}>{facultad}</Text></Text>
            <Text style={styles.perfilItem}>GESTIÓN: <Text style={styles.perfilValue}>{gestion}</Text></Text>
          </Card>

          {/* Tabla de materias */}
          {materias.length > 0 ? (
            materias.map((m, index) => (
              <Card key={index} containerStyle={styles.card}>
                <View style={styles.row}><Text style={styles.label}>TIPO</Text><Text style={styles.value}>{m.tipo}</Text></View>
                <View style={styles.row}><Text style={styles.label}>SIGLA</Text><Text style={styles.value}>{m.sigla}</Text></View>
                <View style={styles.row}><Text style={styles.label}>MATERIA</Text><Text style={styles.value}>{m.materia}</Text></View>
                <View style={styles.row}><Text style={styles.label}>GRUPO</Text><Text style={styles.value}>{m.grupo}</Text></View>
                <View style={styles.row}><Text style={styles.label}>1ER PARCIAL</Text><Text style={styles.value}>{m['1er_parcial']}</Text></View>
                <View style={styles.row}><Text style={styles.label}>2DO PARCIAL</Text><Text style={styles.value}>{m['2do_parcial']}</Text></View>
                <View style={styles.row}><Text style={styles.label}>3ER PARCIAL</Text><Text style={styles.value}>{m['3er_parcial']}</Text></View>
                <View style={styles.row}><Text style={styles.label}>PROM. PARCIALES</Text><Text style={styles.value}>{m.prom_parciales}</Text></View>
                <View style={styles.row}><Text style={styles.label}>PRÁCTICAS</Text><Text style={styles.value}>{m.prom_practicas}</Text></View>
                <View style={styles.row}><Text style={styles.label}>LABORATORIO</Text><Text style={styles.value}>{m.prom_laboratorio}</Text></View>
                <View style={styles.row}><Text style={styles.label}>EX. FINAL</Text><Text style={styles.value}>{m.ex_final}</Text></View>
                <View style={styles.row}><Text style={styles.label}>PROM. EX FINAL</Text><Text style={styles.value}>{m.prom_ex_final}</Text></View>
                <View style={styles.row}>
                  <Text style={styles.label}>NOTA FINAL</Text>
                  <Text style={[styles.value, m.nota_final >= 51 ? styles.green : styles.red]}>{m.nota_final}</Text>
                </View>
                <View style={styles.row}><Text style={styles.label}>2DO TURNO</Text><Text style={styles.value}>{m['2do_turno']}</Text></View>
              </Card>
            ))
          ) : (
            <Card>
              <Text style={{ color: "#cc0000", textAlign: "center" }}>No hay notas disponibles para este período.</Text>
            </Card>
          )}
        </>
      )}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eef5f5",
    flex: 1,
    padding: 10,
    paddingBottom: 40,
  },
  subtituloContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  subtituloTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#005f5f",
    textAlign: "center",
  },
  subtituloDescripcion: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginTop: 4,
  },
  perfilCard: {
    borderRadius: 6,
    backgroundColor: "#fefefe",
    borderColor: "#ccecec",
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  perfilTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008080",
    marginBottom: 10,
  },
  perfilItem: {
    fontSize: 14,
    marginBottom: 5,
    color: "#444",
  },
  perfilValue: {
    fontWeight: "bold",
    color: "#222",
  },
  dropdown: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  card: {
    borderRadius: 6,
    padding: 0,
    backgroundColor: "#f0fafa",
    borderColor: "#ccecec",
    marginBottom: 20,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomColor: "#d4e7e7",
    borderBottomWidth: 1,
  },
  label: {
    flex: 1.3,
    fontWeight: "bold",
    color: "#2e6d6d",
    textTransform: "uppercase",
  },
  value: {
    flex: 1,
    textAlign: "right",
    color: "#333",
    fontWeight: "500",
  },
  green: {
    color: "#009933",
    fontWeight: "bold",
  },
  red: {
    color: "#cc0000",
    fontWeight: "bold",
  },
});

export default VerNotasScreen;
