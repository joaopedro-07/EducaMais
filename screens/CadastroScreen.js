import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { supabase } from '../supabase';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

export default function CadastroScreen() {
const navigation = useNavigation();
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');

async function handleCadastro() {
if (!nome || !email || !senha) {
Alert.alert('Erro', 'Preencha todos os campos.');
return;
}

const { error } = await supabase.auth.signUp({
  email,
  password: senha,
  options: { data: { nome } },
});

if (error) {
  Alert.alert('Erro no cadastro', error.message);
} else {
  Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
  navigation.navigate('LoginScreen');
}


}

return ( <View style={styles.container}>
{/* Botão de voltar */}
<TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}> <Ionicons name="arrow-back" size={40} color="#0D5666" /> </TouchableOpacity>

  <Image source={require('../assets/src/logo_escola1.png')} style={styles.logo} />

  <Text style={styles.title}>Cadastro</Text>

  <TextInput
    style={styles.input}
    placeholder="Nome"
    placeholderTextColor="#082F42"
    value={nome}
    onChangeText={setNome}
  />

  <TextInput
    style={styles.input}
    placeholder="Email"
    placeholderTextColor="#082F42"
    value={email}
    onChangeText={setEmail}
    autoCapitalize="none"
  />

  <TextInput
    style={styles.input}
    placeholder="Senha"
    placeholderTextColor="#082F42"
    secureTextEntry
    value={senha}
    onChangeText={setSenha}
  />

  <TouchableOpacity style={styles.btn} onPress={handleCadastro}>
    <Text style={styles.btnText}>Cadastrar</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
    <Text style={styles.link}>Já possui uma conta? Faça login</Text>
  </TouchableOpacity>
</View>

);
}
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
padding: 25,
backgroundColor: '#FFFEF8',
},
backBtn: {
position: 'absolute',
top: 70,
left: 20,
zIndex: 10,
},
logo: {
width: 120,
height: 120,
resizeMode: 'contain',
alignSelf: 'center',
marginBottom: 20,
borderRadius: 20,
},
title: {
fontSize: 32,
fontWeight: 'bold',
textAlign: 'center',
marginBottom: 40,
color: '#0D5666',
textShadowColor: '#082F42',
textShadowOffset: { width: 1, height: 1 },
textShadowRadius: 2,
},
input: {
backgroundColor: '#FFFEF8',
padding: 15,
borderRadius: 12,
marginBottom: 20,
borderWidth: 2,
borderColor: '#0D5666',
color: '#082F42',
fontSize: 16,
},
btn: {
backgroundColor: '#EE9335',
padding: 15,
borderRadius: 12,
marginBottom: 20,
shadowColor: '#082F42',
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.3,
shadowRadius: 4,
elevation: 5,
},
btnText: {
color: '#FFFEF8',
textAlign: 'center',
fontWeight: 'bold',
fontSize: 18,
},
link: {
color: '#0D5666',
textAlign: 'center',
fontSize: 14,
textDecorationLine: 'underline',
},
});
