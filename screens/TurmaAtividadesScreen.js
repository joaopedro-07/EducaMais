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
      {/* Botão Nova Atividade (Laranja) */}
      <TouchableOpacity
        style={styles.novaAtividadeBtn}
        onPress={() => navigation.navigate('CreateAtividade', { turmaId })}
      >
        <Text style={styles.novaAtividadeBtnText}>+ Nova Atividade</Text>
      </TouchableOpacity>

      <FlatList
        data={atividades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>

            <View style={styles.btnRow}>
              {/* Botão Editar (Azul Principal) */}
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() => navigation.navigate('EditarAtividade', { atividade: item })}
              >
                <Text style={styles.actionButtonText}>Editar</Text>
              </TouchableOpacity>
              
              {/* Botão Excluir (Outro Azul / Azul Escuro) */}
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => deletarAtividade(item.id)}
              >
                <Text style={styles.actionButtonText}>Excluir</Text>
              </TouchableOpacity>
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
    backgroundColor: '#FFFEF8', // bege
  },
  novaAtividadeBtn: {
    backgroundColor: '#EE9335', // laranja
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  novaAtividadeBtnText: {
    color: '#FFFEF8', // bege
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#FFFFFF', // Branco puro para contraste, ou #FFFEF8 (bege) se preferir
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D5666', // azul principal
    marginBottom: 5,
  },
  descricao: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 10,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 10, 
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#0D5666', // azul principal para editar
  },
  deleteButton: {
    backgroundColor: '#082F42', // outro azul (mais escuro) para exclusão
  },
  actionButtonText: {
    color: '#FFFEF8', // bege
    fontWeight: 'bold',
    fontSize: 14,
  },
});