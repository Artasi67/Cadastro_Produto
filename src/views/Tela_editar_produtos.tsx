import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Button, Modal, TextInput } from 'react-native';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type prop_navegacao = StackNavigationProp<RootStackParamList, "Listagem">

interface Produto {
    id: string;
    nome: string;
    descricao: string;
    valor: string;
}

const Tela_listar_produtos: React.FC = () => {
    const navegacao = useNavigation<prop_navegacao>();
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

    const cadastro = () => {
        navegacao.navigate("Cadastro");
    };

    useEffect(() => {
        const busca_produtos = async () => {
            try {
                const lista_produtos = await AsyncStorage.getItem('produtos');
                if (lista_produtos) {
                    setProdutos(JSON.parse(lista_produtos));
                }
            } catch (error) {
                console.log("Erro ao buscar lista", error);
            }
        };
        busca_produtos();
    }, []);

    const abrirModalEdicao = (produto: Produto) => {
        setProdutoEditando(produto);
        setModalVisible(true);
    };

    const salvarEdicao = async () => {
        if (produtoEditando) {
            const novaLista = produtos.map(p =>
                p.id === produtoEditando.id ? produtoEditando : p
            );
            setProdutos(novaLista);
            await AsyncStorage.setItem('produtos', JSON.stringify(novaLista));
            setModalVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Produtos</Text>
            <Button title='Cadastrar Novo Produto' onPress={cadastro} />
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.nome}>{item.nome}</Text>
                        <Text>{item.descricao}</Text>
                        <Text style={styles.valor}>R$ {item.valor}</Text>
                        <Button title='Editar' onPress={() => abrirModalEdicao(item)} />
                    </View>
                )}
            />
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.titulo}>Editar Produto</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            value={produtoEditando?.nome}
                            onChangeText={(text) => setProdutoEditando(prev => prev ? { ...prev, nome: text } : null)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição"
                            value={produtoEditando?.descricao}
                            onChangeText={(text) => setProdutoEditando(prev => prev ? { ...prev, descricao: text } : null)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Valor"
                            value={produtoEditando?.valor}
                            onChangeText={(text) => setProdutoEditando(prev => prev ? { ...prev, valor: text } : null)}
                            keyboardType="numeric"
                        />
                        <Button title="Salvar" onPress={salvarEdicao} />
                        <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};


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
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    valor: {
        fontSize: 14,
        color: 'green'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        marginBottom: 10
    }
});


export default Tela_listar_produtos;