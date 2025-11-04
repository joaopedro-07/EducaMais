import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../supabase';
import { useIsFocused } from '@react-navigation/native';

export default function TurmaAtividadesScreen({ route, navigation }) {
  const { turmaId } = route.params;
  const [atividades, setAtividades] = useState([]);
  const isFocused = useIsFocused();

  async function fetchAtividades() {
    const { data, error } = await supabase
      .from('atividades')
      .select('*')
      .eq('turma_id', turmaId)
      .order('criado_em', { ascending: false });

    if (error) Alert.alert('Erro', error.message);
    else setAtividades(data);
  }

  useEffect(() => {
    if (isFocused) fetchAtividades();
  }, [isFocused]);

  async function deletarAtividade(id) {
    Alert.alert('Confirmação', 'Deseja excluir essa atividade?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const { error } = await supabase.from('atividades').delete().eq('id', id);
          if (error) Alert.alert('Erro', error.message);
          else fetchAtividades();
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Nova Atividade"
        onPress={() => navigation.navigate('CreateAtividade', { turmaId })}
      />

      <FlatList
        data={atividades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text>{item.descricao}</Text>

            <View style={styles.btnRow}>
              <Button
                title="Editar"
                onPress={() => navigation.navigate('EditarAtividade', { atividade: item })}
              />
              <Button
                title="Excluir"
                color="red"
                onPress={() => deletarAtividade(item.id)}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#f9f9f9',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
