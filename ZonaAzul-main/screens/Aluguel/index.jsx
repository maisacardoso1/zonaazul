import { useState } from 'react';
import { View, TextInput, StatusBar, Text, Pressable, Alert } from "react-native";
import { StyleAluguel } from "./style";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 
import React from 'react';
import { apiConfig } from '../../api/axios';

export default function Aluguel() {
    
    const [telefone, setTelefone] = useState('');
    const [veiculo, setVeiculo] = useState('');
    const [tempoHoras, setTempoHoras] = useState('');
    const [istelefone, setIstelefone] = useState(false);
    const [isveiculo, setIsveiculo] = useState(false);
    const [istempoHoras, setIstempoHoras] = useState(false);

    const navigation = useNavigation();

    async function handlePress() {
        if (!istelefone && !isveiculo && !istempoHoras && telefone !== '' && veiculo !== '' && tempoHoras !== '') {
        try {
            const response = await apiConfig.post('/aluguel', { 
                veiculo: veiculo,
                telefone: telefone,
                tempo_horas: tempoHoras 
            });

            if (response.status === 204) {
                Alert.alert('Ops...', 'erro ao cadastrar ticker', [
                  {
                    text: 'Ok'
                  }
                ]);
              } else {

                navigation.navigate("Comprovante");
            }

        } catch (error) {
            console.error('Erro ao enviar dados:', error.response ? error.response.data : error.message);
        }
    }else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
          }
    };

    return (
        <View style={StyleAluguel.root}>
            <StatusBar />
            <View style={StyleAluguel.card}>

                <TextInput
                    style={StyleAluguel.input}
                    placeholder="Veiculo"
                    value={veiculo} 
                    onChangeText={setVeiculo}
                />

                <TextInput
                    style={StyleAluguel.input}
                    placeholder="Tempo em horas"
                    value={tempoHoras}
                    onChangeText={setTempoHoras}
                    keyboardType="numeric" 
                />

                

                <TextInput
                    style={StyleAluguel.input}
                    placeholder="Telefone"
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="numeric"
                />
                <Pressable style={StyleAluguel.button} onPress={()=> handlePress()}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Começar</Text>
                </Pressable>
            </View>
        </View>
    );
}
 
