import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../supabase';

export default function CreateAtividadeScreen({ route, navigation }) {
  const { turmaId } = route.params;
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  async function criarAtividade() {
    const { error } = await supabase.from('atividades').insert({ turma_id: turmaId, titulo, descricao });
    if (error) Alert.alert('Erro', error.message);
    else navigation.goBack();
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput placeholder="Título" value={titulo} onChangeText={setTitulo} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <Button title="Criar Atividade" onPress={criarAtividade} />
    </View>
  );
}