import React from "react";
import { View, Text,TextInput, Button, Alert, StyleSheet } from "react-native";

const Tela_cadastro_produto: React.FC = () => {

    return(
        <View>Olá Mundo!</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",        
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    input:{
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 5,
    }
})

export default Tela_cadastro_produto;