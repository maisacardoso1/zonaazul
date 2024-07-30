import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import axios from 'axios';
import { StyleAluguel } from "../Aluguel/style";
import { apiConfig } from '../../api/axios';

export default function Comprovante() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const response = await apiConfig.get('/vizualizar');
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchDados();
    }, []);

    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}} >
            <StatusBar />
            <View style={StyleAluguel.card}>
                {dados.length === 0 ? (
                    <Text>Carregando dados...</Text>
                ) : (
                    dados.map((item, index) => (
                        <View key={index} style={{ marginBottom: 20, height: 100, }}>
                            <Text style={{fontSize: 25, color: '#fff'}}>Veículo: {item.veiculo}</Text>
                            <Text style={{fontSize: 25, color: '#fff', }}>Telefone: {item.telefone}</Text>
                            <Text style={{fontSize: 25, color: '#fff'}}>Tempo em Horas: {item.tempo_horas}</Text>
                        </View>
                    ))
                )}
            </View>
        </View>
    );
}
