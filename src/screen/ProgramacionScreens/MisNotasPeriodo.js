import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { Dropdown } from 'react-native-element-dropdown';

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
    { id: 7, materia: 'Química', nota: 60 },
  ]
};

const MisNotasPeriodo = () => {
  const [periodo, setPeriodo] = useState(null);
  const [opciones, setOpciones] = useState([]);

  const tablas = datosPorPeriodo[periodo] || [];

  useEffect(() => {
    const cargarOpciones = async () => {
      const data = [
        { label: 'Primer Trimestre', value: '1' },
        { label: 'Segundo Trimestre', value: '2' },
        { label: 'Tercer Trimestre', value: '3' },
        { label: 'Cuarto Trimestre', value: '4' }, // corregido
      ];
      setOpciones(data);
    };

    cargarOpciones();
  }, []);

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
        placeholder="Seleccione gestión y período"
        value={periodo}
        onChange={item => setPeriodo(item.value)}
      />

      {tablas.length > 0 ? (
        tablas.map((item) => (
          <Card key={item.id}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.materia}</Text>
            <Text style={{ fontSize: 14 }}>Nota: {item.nota}</Text>
          </Card>
        ))
      ) : periodo && (
        <Card>
          <Text style={{ color: '#cc0000', textAlign: 'center' }}>
            No hay notas disponibles para este período.
          </Text>
        </Card>
      )}
    </ScrollView>
  );
};

export default MisNotasPeriodo;
