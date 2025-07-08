import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import useFetch from '../../../hooks/useFetch';
import { Icon } from 'react-native-elements';

const TablasNotasHorizontal = () => {
  const { perfil } = useFetch();

  const studentData = useMemo(() => ({
    FACULTAD: perfil?.facultad || '',
    CARRERA: perfil?.programa || '',
    RU: perfil?.id_alumno || '',
    CI: perfil?.nro_dip || '',
    UNIVERSITARIO: `${perfil?.nombres || ''} ${perfil?.paterno || ''} ${perfil?.materno || ''}`,
    'FECHA PROGRAMACIÓN': perfil?.fecha_programacion || '',
  }), [perfil]);

  const materias = useMemo(() => {
    // Puedes comentar esta parte para usar datos de prueba
    return [...(perfil?.materias || [])].sort((a, b) => a.sigla.localeCompare(b.sigla));
    
    // Datos de prueba si no hay materias reales
    /*
    return [
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
    ];
    */
  }, [perfil]);

  const renderSubjectItem = ({ item, index }) => (
    <View style={[styles.tableRow, index % 2 === 0 && styles.evenRow]}>
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
      <Text style={[styles.tableCell, item.nota_final >= 51 ? styles.green : styles.red]}>{item.nota_final}</Text>
      <Text style={styles.tableCell}>{item['2do_turno']}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>MATERIAS PROGRAMADAS</Text>
      <Text style={styles.subHeader}>GESTIÓN: {perfil?.gestion || '---'}</Text>

      {/* Info Estudiante */}
      <View style={styles.infoContainer}>
        {Object.entries(studentData).map(([key, value]) => (
          <View style={styles.infoRow} key={key}>
            <Text style={styles.infoLabel}>{key}:</Text>
            <Text style={styles.infoValue}>{value}</Text>
          </View>
        ))}
      </View>

      {/* Tabla Horizontal */}
      <ScrollView horizontal>
        <View>
          <View style={styles.tableHeader}>
            {[
              'SIGLA', 'MATERIA', 'GRUPO', '1ER PARCIAL', '2DO PARCIAL', '3ER PARCIAL',
              'PROM. PARCIAL', 'PROM. PRÁCTICAS', 'PROM. LAB.', 'EX. FINAL',
              'PROM. EX.', 'NOTA FINAL', '2DO TURNO',
            ].map((title, idx) => (
              <Text
                key={idx}
                style={[
                  styles.tableHeaderCell,
                  title === 'SIGLA' && styles.siglaColumn,
                  title === 'MATERIA' && styles.materiaColumn,
                ]}
              >
                {title}
              </Text>
            ))}
          </View>

          <FlatList
            data={materias}
            renderItem={renderSubjectItem}
            keyExtractor={(item, index) => `${item.sigla}_${index}`}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* Botón imprimir */}
      <View style={styles.printButtonContainer}>
        <TouchableOpacity
          style={styles.printButton}
          onPress={() => console.log("Imprimir programación")}
        >
          <Icon name="print" type="font-awesome" color="#fff" size={20} />
          <Text style={styles.printButtonText}>IMPRIMIR PROGRAMACION</Text>
        </TouchableOpacity>
      </View>
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
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: '600',
    color: '#666',
    width: 150,
  },
  infoValue: {
    color: '#333',
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#dee2e6',
    paddingVertical: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 8,
    width: 90,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  tableCell: {
    textAlign: 'center',
    paddingHorizontal: 8,
    color: '#333',
    width: 90,
  },
  siglaColumn: {
    width: 70,
  },
  materiaColumn: {
    width: 160,
    textAlign: 'left',
  },
  green: {
    color: '#009933',
    fontWeight: 'bold',
  },
  red: {
    color: '#cc0000',
    fontWeight: 'bold',
  },
  printButtonContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  printButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    marginTop: 20,
  },
  printButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default TablasNotasHorizontal;
