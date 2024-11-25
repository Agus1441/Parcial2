import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EquiposScreen from './equiposScreen';
import EquipoDetail from './equipoDetail';
import EditEquipoDetail from './EditEquipoDetail';
import CreatePlanetScreen from './CreateEquipoScreen';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Equipos">
      <Stack.Screen name="Equipos" component={EquiposScreen} />
      <Stack.Screen name="Detalles" component={EquipoDetail} />
      <Stack.Screen name="Editar" component={EditEquipoDetail} />
      <Stack.Screen name="Crear" component={CreatePlanetScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;