import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Alert } from 'react-native';
import { putEquipo } from '@/services';

interface Equipo {
  id: string;
  name: string;
  description: string;
  goals: number;
  points: number;
  logo: string;
}

interface Props {
  route: any;
  navigation: any;
}

const EditEquipoDetail: React.FC<Props> = ({ navigation, route }) => {
  const { equipo } = route.params;
  const [name, setName] = useState<string>(equipo.name);
  const [description, setDescription] = useState<string>(equipo.description);
  const [goals, setGoals] = useState<string>((equipo.goals));
  const [points, setPoints] = useState<string>(equipo.points);
  
  const handleSave = async () => {
    const updatedEquipo: Equipo = {
      ...equipo,
      name,
      description,
      goals: Number(goals),
      points: Number(points),
    };

    try {
      await putEquipo(updatedEquipo);
      navigation.setParams({ equipo: updatedEquipo });
      navigation.navigate('Equipos', { refresh: true });
      

      Alert.alert(
        'Success',
        'El planeta a sido actualizoda correctamente',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error updating equipo:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput 
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        style={styles.input}
      />
      <TextInput 
        value={goals}
        onChangeText={setGoals}
        placeholder="Goles"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput 
        value={points}
        onChangeText={setPoints}
        placeholder="Puntos"
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default EditEquipoDetail;
