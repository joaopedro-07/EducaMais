import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Adicionei SafeAreaView para melhor compatibilidade
import { supabase } from '../supabase';

export default function CreateTurmaScreen({ navigation }) {
  const [nome, setNome] = useState('');

  async function criarTurma() {
    if (!nome.trim()) {
      Alert.alert('Aviso', 'O nome da turma não pode ser vazio.');
      return;
    }

    const user = (await supabase.auth.getUser()).data.user;
    const { error } = await supabase.from('turmas').insert({ nome, professor_id: user.id });
    
    if (error) Alert.alert('Erro', error.message);
    else navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Criar Nova Turma</Text>
      
      <TextInput 
        placeholder="Nome da turma" 
        placeholderTextColor="#A0A0A0"
        value={nome} 
        onChangeText={setNome} 
        style={styles.input} 
      />
      
      <TouchableOpacity 
        style={styles.createButton} 
        onPress={criarTurma}
        disabled={!nome.trim()} // Desabilita se o campo estiver vazio
      >
        <Text style={styles.buttonText}>Criar Turma</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#FFFEF8', // bege
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D5666', // azul
    marginBottom: 40,
    marginTop: 20,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#0D5666', // azul na borda
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    color: '#333333',
  },
  createButton: {
    width: '100%',
    backgroundColor: '#EE9335', // laranja
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFEF8', // bege
    fontSize: 18,
    fontWeight: 'bold',
  },
});