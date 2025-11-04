import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../supabase';

export default function EditarTurma({ route, navigation }) {
  const { turma } = route.params;
  const [nome, setNome] = useState(turma.nome);

  async function salvarEdicao() {
    if (!nome.trim()) {
      Alert.alert('Erro', 'O nome da turma não pode estar vazio.');
      return;
    }

    const { error } = await supabase
      .from('turmas')
      .update({ nome })
      .eq('id', turma.id);

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'Turma atualizada com sucesso!');
      navigation.goBack();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Editar Turma</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da turma"
        value={nome}
        onChangeText={setNome}
      />

      <Button title="Salvar Alterações" onPress={salvarEdicao} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
});