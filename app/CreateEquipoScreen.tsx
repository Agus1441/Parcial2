import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { postEquipo } from '@/services';

const CreatePlanetScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { onAddEquipo } = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goals, setGoals] = useState('');
  const [points, setPoints] = useState('');

  const handleSubmit = async () => {
    if (!name || !description || !goals || !points ) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios.');
      return;
    }

    const newEquipo = {
      name,
      description,
      goals: parseInt(goals, 10),
      points: parseInt(points, 10),
    };

    try {
      await postEquipo(newEquipo);
      Alert.alert('Éxito', 'Planeta creado correctamente.');
      onAddEquipo(newEquipo); 
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el planeta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre del equipo"
      />
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción del equipo"
      />
      <Text style={styles.label}>Número de goles</Text>
      <TextInput
        style={styles.input}
        value={goals}
        onChangeText={setGoals}
        placeholder="Número de goles"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Número de puntos</Text>
      <TextInput
        style={styles.input}
        value={points}
        onChangeText={setPoints}
        placeholder="Número de puntos"
        keyboardType="numeric"
      />
      <Button title="Crear Planeta" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default CreatePlanetScreen;
