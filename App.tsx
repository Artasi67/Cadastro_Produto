import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tela_cadastro_produto from './src/views/Tela_cadastro_produto';

export default function App() {
  return (
    <Tela_cadastro_produto/>
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