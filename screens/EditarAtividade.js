import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../supabase';

export default function EditarAtividade({ route, navigation }) {
  const { atividade } = route.params;
  const [titulo, setTitulo] = useState(atividade.titulo);
  const [descricao, setDescricao] = useState(atividade.descricao);

  async function salvarEdicao() {
    if (!titulo || !descricao) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const { error } = await supabase
      .from('atividades')
      .update({ titulo, descricao })
      .eq('id', atividade.id);

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'Atividade atualizada com sucesso!');
      navigation.goBack();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Editar Atividade</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descrição"
        multiline
        value={descricao}
        onChangeText={setDescricao}
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
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});
