import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
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

return ( <SafeAreaView style={styles.container}> <Text style={styles.title}>Editar Atividade</Text>

  <TextInput
    style={styles.input}
    placeholder="Título"
    placeholderTextColor="#082F42"
    value={titulo}
    onChangeText={setTitulo}
  />

  <TextInput
    style={[styles.input, { height: 120 }]}
    placeholder="Descrição"
    placeholderTextColor="#082F42"
    multiline
    value={descricao}
    onChangeText={setDescricao}
  />

  <TouchableOpacity style={styles.btn} onPress={salvarEdicao}>
    <Text style={styles.btnText}>Salvar Alterações</Text>
  </TouchableOpacity>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
backgroundColor: '#FFFEF8', // bege
},
title: {
fontSize: 26,
fontWeight: 'bold',
marginBottom: 25,
textAlign: 'center',
color: '#0D5666', // azul
},
input: {
backgroundColor: '#FFFEF8',
borderWidth: 2,
borderColor: '#0D5666', // azul
padding: 15,
borderRadius: 12,
marginBottom: 20,
color: '#082F42', // outro azul
fontSize: 16,
},
btn: {
backgroundColor: '#EE9335', // laranja
paddingVertical: 15,
borderRadius: 12,
alignItems: 'center',
shadowColor: '#082F42',
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.25,
shadowRadius: 4,
elevation: 5,
},
btnText: {
color: '#FFFEF8', // bege
fontSize: 18,
fontWeight: 'bold',
},
});
