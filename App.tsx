import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import EditTaskScreen from './screens/EditTaskScreen'; // Import de l'écran d'édition
import { RootStackParamList } from './screens/navigation/types';
import { TaskProvider } from './context/useTaskContext';

// Définir une palette de couleurs
const Colors = {
  primary: '#6200EE', // Couleur principale
  secondary: '#03DAC6', // Couleur secondaire
  background: '#f0f4f8', // Couleur de fond
  text: '#333', // Couleur du texte
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary }, // Utiliser la couleur primaire pour l'en-tête
            headerTintColor: '#fff', // Couleur du texte de l'en-tête
            headerTitleStyle: { fontWeight: 'bold' },
            contentStyle: { backgroundColor: Colors.background }, // Couleur de fond des écrans
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Task List' }} // Titre personnalisé pour l'écran d'accueil
          />
          <Stack.Screen
            name="AddTask"
            component={AddTaskScreen}
            options={{ title: 'Add New Task' }} // Titre pour l'écran d'ajout de tâche
          />
          <Stack.Screen
            name="EditTask"
            component={EditTaskScreen}
            options={{ title: 'Edit Task' }} // Titre pour l'écran d'édition de tâche
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}
