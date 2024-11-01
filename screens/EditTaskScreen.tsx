import React, { useState, useEffect } from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { RootStackParamList } from './navigation/types';
import { useTaskContext } from '../context/useTaskContext';

type EditTaskProps = NativeStackScreenProps<RootStackParamList, "EditTask">;

const EditTaskScreen: React.FC<EditTaskProps> = ({ route, navigation }) => {
  const { taskId } = route.params;
  const { tasks, updateTask } = useTaskContext();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setTitle(task.title);
    }
  }, [taskId, tasks]);

  const handleUpdateTask = () => {
    if (title.trim()) {
      updateTask(taskId, { title });
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please enter a task title');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Edit task title"
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateTask}>
          <Text style={styles.buttonText}>Update Task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8', // Couleur de fond douce
  },
  input: {
    height: 50,
    borderColor: '#4a90e2', // Couleur de bordure
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#ffffff', // Couleur de fond du champ de saisie
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonContainer: {
    marginTop: 20, // Ajoute de l'espace au-dessus des boutons
  },
  updateButton: {
    backgroundColor: '#4caf50', // Couleur de fond attrayante
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10, // Espace entre les boutons
  },
  cancelButton: {
    backgroundColor: '#d32f2f', // Couleur d'annulation
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16, // Augmente la taille de la police pour la lisibilité
  },
});

export default EditTaskScreen;
