import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  name: string;
  description: string;
  goals: number;
  points: number;
  onPress: () => void;
}



const EquipoCard: React.FC<Props> = ({ name, description, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.name}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EquipoCard;
