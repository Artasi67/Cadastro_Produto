import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Button } from 'react-native';
import { RootStackParamList } from '../../App';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

type prop_navegacao = StackNavigationProp<RootStackParamList, "Listagem">

interface Produto {
    id: string;
    nome: string;
    descricao: string;
    valor: string
}

const Tela_listar_produtos: React.FC = () => {
    const navegacao = useNavigation<prop_navegacao>();
    const [produtos, setProdutos] = useState<Produto[]>([])

    const cadastro = () => {
        navegacao.navigate("Cadastro")
    }

    useEffect(() => {
        const busca_produtos = async () => {
            try {
                const lista_produtos = await AsyncStorage.getItem('produtos');
                if (lista_produtos) {
                    setProdutos(JSON.parse(lista_produtos));
                }
            } catch (error) {
                console.log("Erro ao buscar lista", error)
            }
        }
        busca_produtos();
    });

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Produtos</Text>
            <Button title='Cadastrar Novo Produto' onPress={() => { cadastro() }} />
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.nome}>{item.nome}</Text>
                        <Text>{item.descricao}</Text>
                        <Text style={styles.valor}>R$ {item.valor}</Text>
                    </View>
                )}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    itemContainer: {
        padding: 10,
        borderBottomColor: '#ccc'
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    valor: {
        fontSize: 14,
        color: 'green'
    }
})

export default Tela_listar_produtos;