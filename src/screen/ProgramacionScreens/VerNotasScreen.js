import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { Dropdown } from 'react-native-element-dropdown';

// Opciones del dropdown
const opciones = [
  { label: 'Primer Trimestre', value: '1' },
  { label: 'Segundo Trimestre', value: '2' },
  { label: 'Tercer Trimestre', value: '3' },
];

// Tablas por periodo (simuladas)
const datosPorPeriodo = {
  '1': [
    { id: 1, materia: 'Matemáticas', nota: 85 },
    { id: 2, materia: 'Lenguaje', nota: 90 },
  ],
  '2': [
    { id: 3, materia: 'Historia', nota: 88 },
    { id: 4, materia: 'Geografía', nota: 92 },
  ],
  '3': [
    { id: 5, materia: 'Biología', nota: 80 },
    { id: 6, materia: 'Física', nota: 84 },
    { id: 7, materia: 'Química', nota: 60},
  ]
};

const VerNotasScreen = () => {
  const [periodo, setPeriodo] = useState(null);

  const tablas = datosPorPeriodo[periodo] || [];

  return (
    <ScrollView style={{ marginTop: 20, paddingHorizontal: 10 }}>
      <Card>
        <Text style={{
          fontSize: 14,
          textAlign: 'center',
          color: '#7C0404',
        }}>
          * SELECCIONE EL PERÍODO PARA VER SUS NOTAS
        </Text>
      </Card>

      <Dropdown
        style={{
          margin: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          marginTop: 40,
        }}
        data={opciones}
        labelField="label"
        valueField="value"
        placeholder="Seleccione Gestión y periodo de su Programacion"
        value={periodo}
        onChange={item => setPeriodo(item.value)}
      />

      {tablas.length > 0 && (
        <>
          {tablas.map((item) => (
            <Card key={item.id}>
              <Text style={{ fontWeight: 'bold' }}>{item.materia}</Text>
              <Text>Nota: {item.nota}</Text>
            </Card>
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default VerNotasScreen;
