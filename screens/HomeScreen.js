import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../supabase';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [turmas, setTurmas] = useState([]);
  const [professor, setProfessor] = useState(null);
  const isFocused = useIsFocused();

  async function fetchProfessor() {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from('professores')
        .select('nome')
        .eq('id', user.id)
        .single();

      if (!error) setProfessor(data);
    }
  }

  async function fetchTurmas() {
    const { data, error } = await supabase.from('turmas').select('*').order('id', { ascending: true });
    if (error) Alert.alert('Erro', error.message);
    else setTurmas(data);
  }

  useEffect(() => {
    if (isFocused) {
      fetchProfessor();
      fetchTurmas();
    }
  }, [isFocused]);

  async function logout() {
    Alert.alert('Fazer logout', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await supabase.auth.signOut();
          navigation.navigate('Login');
        },
      },
    ]);
  }

  async function deletarTurma(id) {
    Alert.alert('Confirmação', 'Deseja excluir essa turma?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const { error } = await supabase.from('turmas').delete().eq('id', id);
          if (error) {
            if (error.message.includes('violates foreign key constraint')) {
              Alert.alert(
                'Aviso',
                'Essa turma possui atividades associadas.\nExclua as atividades antes de remover a turma.'
              );
            } else {
              Alert.alert('Erro', error.message);
            }
          } else {
            fetchTurmas();
          }
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      {professor && (
        <Text style={styles.saudacao}>Olá, {professor.nome} 👋</Text>
      )}

      <Button title="Nova Turma" onPress={() => navigation.navigate('CreateTurma')} />

      <FlatList
        data={turmas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('TurmaAtividades', { turmaId: item.id })}>
              <Text style={styles.nomeTurma}>{item.nome}</Text>
            </TouchableOpacity>

            <View style={styles.btnRow}>
              <Button
                title="Editar"
                onPress={() => navigation.navigate('EditarTurma', { turma: item })}
              />
              <Button
                title="Excluir"
                color="red"
                onPress={() => deletarTurma(item.id)}
              />
            </View>
          </View>
        )}
      />

      <View style={styles.logoutArea}>
        <Button title="Sair" onPress={logout} color="gray" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  saudacao: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  nomeTurma: {
    fontSize: 18,
    fontWeight: '600',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  logoutArea: {
    marginTop: 20,
    marginBottom: 10,
  },
});
