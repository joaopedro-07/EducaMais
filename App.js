import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from './supabase';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CreateTurmaScreen from './screens/CreateTurmaScreen';
import TurmaAtividadesScreen from './screens/TurmaAtividadesScreen';
import CreateAtividadeScreen from './screens/CreateAtividadeScreen';
import CadastroScreen from './screens/CadastroScreen';
import EditarAtividade from './screens/EditarAtividade';
import EditarTurma from './screens/EditarTurma';

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!session ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cadastro"
              component={CadastroScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreateTurma" component={CreateTurmaScreen} options={{ title: 'Cadastrar Turma' }} />
            <Stack.Screen name="TurmaAtividades" component={TurmaAtividadesScreen} options={{ title: 'Atividades' }} />
            <Stack.Screen name="CreateAtividade" component={CreateAtividadeScreen} options={{ title: 'Cadastrar Atividade' }} />
            <Stack.Screen name="EditarAtividade" component={EditarAtividade} />
            <Stack.Screen name="EditarTurma" component={EditarTurma} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}