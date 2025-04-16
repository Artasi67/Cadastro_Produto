import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tela_cadastro_produto from './src/views/Tela_cadastro_produto';
import Tela_listar_produtos from './src/views/tela_listar_produtos';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParamList = {
  Cadastro: undefined,
  Listagem: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Listagem'>
        <Stack.Screen
          name='Listagem'
          component={Tela_listar_produtos}
          options={{title: "Listagem de Produtos"}}
        />
        <Stack.Screen
          name='Cadastro'
          component={Tela_cadastro_produto}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 