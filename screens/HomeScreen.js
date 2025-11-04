import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../supabase";
import { useIsFocused } from "@react-navigation/native";

const logo = require("../assets/src/logo_escola2.png"); // Ajuste o caminho conforme necessário

export default function HomeScreen({ navigation }) {
  const [turmas, setTurmas] = useState([]);
  const [professor, setProfessor] = useState(null);
  const isFocused = useIsFocused();

  async function fetchProfessor() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("professores")
        .select("nome")
        .eq("id", user.id)
        .single();
      if (!error) setProfessor(data);
    }
  }

  async function fetchTurmas() {
    const { data, error } = await supabase
      .from("turmas")
      .select("*")
      .order("id", { ascending: true });
    if (error) Alert.alert("Erro", error.message);
    else setTurmas(data);
  }

  useEffect(() => {
    if (isFocused) {
      fetchProfessor();
      fetchTurmas();
    }
  }, [isFocused]);

  async function logout() {
    Alert.alert("Fazer logout", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await supabase.auth.signOut();
          navigation.navigate("Login");
        },
      },
    ]);
  }

  async function deletarTurma(id) {
    Alert.alert("Confirmação", "Deseja excluir essa turma?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase.from("turmas").delete().eq("id", id);
          if (error) {
            if (error.message.includes("violates foreign key constraint")) {
              Alert.alert(
                "Aviso",
                "Essa turma possui atividades associadas.\nExclua as atividades antes de remover a turma."
              );
            } else {
              Alert.alert("Erro", error.message);
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
      {/* Header com logo, saudação e botão Sair */}{" "}
      <View style={styles.header}>
        {" "}
        <Image source={logo} style={styles.logo} />
        {professor && (
          <Text style={styles.saudacao}>Olá, {professor.nome} 👋</Text>
        )}{" "}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          {" "}
          <Text style={styles.logoutButtonText}>Sair</Text>{" "}
        </TouchableOpacity>{" "}
      </View>
      <TouchableOpacity
        style={styles.novaTurmaBtn}
        onPress={() => navigation.navigate("CreateTurma")}
      >
        <Text style={styles.novaTurmaBtnText}>Nova Turma</Text>
      </TouchableOpacity>
      <FlatList
        data={turmas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TurmaAtividades", { turmaId: item.id })
              }
            >
              <Text style={styles.nomeTurma}>{item.nome}</Text>
            </TouchableOpacity>
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() =>
                  navigation.navigate("EditarTurma", { turma: item })
                }
              >
                <Text style={styles.actionButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => deletarTurma(item.id)}
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
    backgroundColor: "#FFFEF8",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 30,
    marginRight: 10,
  },
  saudacao: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0D5666",
    flex: 1,
    marginRight: 5,
  },
  logoutButton: {
    backgroundColor: "#EE9335",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#FFFEF8",
    fontWeight: "bold",
    fontSize: 14,
  },
  novaTurmaBtn: {
    backgroundColor: "#EE9335",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#082F42",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  novaTurmaBtnText: {
    color: "#FFFEF8",
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#FFFEF8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#082F42",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nomeTurma: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0D5666",
    marginBottom: 10,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: "#0D5666",
  },
  deleteButton: {
    backgroundColor: "#EE9335",
  },
  actionButtonText: {
    color: "#FFFEF8",
    fontWeight: "bold",
    fontSize: 14,
  },
});
