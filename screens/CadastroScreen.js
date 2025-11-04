import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../supabase';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleCadastro() {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    // 1️⃣ Cria o usuário no Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    console.log('🔍 authData:', JSON.stringify(authData, null, 2)); // <-- AQUI O LOG
    console.log('🔍 signUpError:', signUpError); // <-- E AQUI SE TIVER ERRO

    if (signUpError) {
      Alert.alert('Erro no cadastro', signUpError.message);
      return;
    }

    // 2️⃣ Busca o usuário logado depois do signUp
    const { data: userData, error: userError } = await supabase.auth.getUser();

    console.log('🔍 userData:', JSON.stringify(userData, null, 2)); // <-- E AQUI PRA VER O ID

    if (userError || !userData?.user) {
      Alert.alert('Erro', 'Não foi possível obter o ID do usuário após cadastro.');
      return;
    }

    const user = userData.user;

    // 3️⃣ Insere o professor na tabela 'professores'
    const { error: insertError } = await supabase
      .from('professores')
      .insert([{ id: user.id, nome, email }]);

    if (insertError) {
      console.log('🔍 insertError:', insertError);
      Alert.alert('Erro ao salvar dados', insertError.message);
      return;
    }

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Professor</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.btn} onPress={handleCadastro}>
        <Text style={styles.btnText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  btn: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    color: '#007bff',
    textAlign: 'center',
  },
});
