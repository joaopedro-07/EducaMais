import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../supabase';

export default function CreateTurmaScreen({ navigation }) {
  const [nome, setNome] = useState('');

  async function criarTurma() {
    const user = (await supabase.auth.getUser()).data.user;
    const { error } = await supabase.from('turmas').insert({ nome, professor_id: user.id });
    if (error) Alert.alert('Erro', error.message);
    else navigation.goBack();
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput placeholder="Nome da turma" value={nome} onChangeText={setNome} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <Button title="Criar Turma" onPress={criarTurma} />
    </View>
  );
}