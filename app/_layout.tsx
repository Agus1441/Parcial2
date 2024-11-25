import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './index';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Index">
      <Stack.Screen name="Index" component={Index} />
    </Stack.Navigator>
  );
};

export default AppNavigator;