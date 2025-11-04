import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { supabase } from '../supabase';

export default function LoginScreen({ navigation }) {
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');

async function handleLogin() {
if (!email || !senha) {
Alert.alert('Erro', 'Preencha todos os campos.');
return;
}

const { error } = await supabase.auth.signInWithPassword({
  email,
  password: senha,
});

if (error) {
  Alert.alert('Erro no login', error.message);
}


}

return ( <View style={styles.container}>
<Image source={require('../assets/src/logo_escola1.png')} style={styles.logo} />

```
  <Text style={styles.title}>Educa+</Text>

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

  <TouchableOpacity style={styles.btn} onPress={handleLogin}>
    <Text style={styles.btnText}>Entrar</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
    <Text style={styles.link}>Não possui uma conta? Cadastre-se</Text>
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
