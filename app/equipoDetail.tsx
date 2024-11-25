import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getEquipo, deleteEquipo } from '@/services';
import { Button } from 'react-native';

interface Equipo {
  id: string;
  name: string;
  description: string;
  points: number;
  goals: number;
}

const EquipoDetail: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { id } = route.params;
  const [equipo, setEquipo] = useState<Equipo>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipo = async () => {
      try {
        const data = await getEquipo(id);
        setEquipo(data);
      } catch (error) {
        console.error('Error fetching equipo details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipo();
  }, [id]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteEquipo(id);
      navigation.navigate('Equipos', { refresh: true });
    } catch (error) {
      console.error('Error borando equipo:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{equipo?.name}</Text>
      <Text style={styles.description}>{equipo?.description}</Text>
      <Text style={styles.goals_points}>Goles: {equipo?.goals}</Text>
      <Text style={styles.goals_points}>Puntos: {equipo?.points}</Text>

      <Button
        title="Editar Equipo"
        onPress={() => navigation.navigate('Editar', { id: equipo?.id, equipo })}
      />
      <View style={{ marginTop: 20 }}>
        <Button title="Eliminar Equipo" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  goals_points: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default EquipoDetail;
