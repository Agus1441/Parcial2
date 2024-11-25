import React, { useState, useEffect } from 'react';
import { View, FlatList,Platform, StyleSheet, ActivityIndicator, Button } from 'react-native';
import EquipoCard from '@/components/equipoCard';
import { getEquipos } from '@/services';

interface Equipo {
  id: string;
  name: string;
  description: string;
  points: number;
  goals: number; 
  logo: string;
}

interface Props {
  navigation: any;
}

const EquiposScreen: React.FC<Props> = ({ navigation }) => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [originalEquipos, setOriginalEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const data = await getEquipos();
        setEquipos(data);
        setOriginalEquipos(data);
      } catch (error) {
        console.error('Error fetching equipos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  const handleAddEquipo = (newEquipo: Equipo) => {
    setEquipos((prevEquipos) => [...prevEquipos, newEquipo]);
    setOriginalEquipos((prevEquipos) => [...prevEquipos, newEquipo]);
  };

  const toggleSortByPoints = () => {
    if (sorted) {
      setEquipos(originalEquipos);
    } else {
      setEquipos((prevEquipos) =>
        [...prevEquipos].sort((a, b) => b.points - a.points)
      );
    }
    setSorted(!sorted); 
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={equipos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EquipoCard
            name={item.name}
            description={item.description}
            points={item.points}
            goals={item.goals}
            onPress={() => navigation.navigate('Detalles', { id: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
      />
      <View style={styles.buttonContainer}>
        <View style={Platform.OS === 'android' ? styles.androidButton : styles.iosButton}>
          <Button
            title={sorted ? "Orden Original" : "Ordenar por Puntos"}
            color={Platform.OS === 'android' ? "blue" : "green"}
            onPress={toggleSortByPoints}
          />
        </View>
        <View style={Platform.OS === 'android' ? styles.androidButton : styles.iosButton}>
          <Button
            title={Platform.OS === 'android' ? "Nuevo Equipo" : "Crear Equipo"}
            color={Platform.OS === 'android' ? "blue" : "green"}
            onPress={() =>
              navigation.navigate('Crear', { onAddEquipo: handleAddEquipo })
            }
          />
        </View>
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
  list: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  button: {
    padding: 5,
  },
  androidButton: {
    alignSelf: 'flex-start',
    margin: 10,
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
  },
  iosButton: {
    alignSelf: 'flex-end',
    margin: 10,
    backgroundColor: 'green', 
    padding: 5,
    borderRadius: 5,
  },
});

export default EquiposScreen;
