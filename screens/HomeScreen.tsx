import React, { useCallback } from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, FlatList, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { RootStackParamList } from "./navigation/types"; 
import { useFocusEffect } from '@react-navigation/native';
import { useTaskContext } from '../context/useTaskContext';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { tasks, deleteTask } = useTaskContext();

  useFocusEffect(
    useCallback(() => {
      // Logique à ajouter si nécessaire pour récupérer ou actualiser les tâches
    }, [tasks])
  );

  const handleDeleteTask = (id: string) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel" },
        { text: "OK", onPress: () => deleteTask(id) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddTask")}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.title}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditTask", { taskId: item.id })}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTask(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e0f7fa' },
  addButton: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  taskItem: { 
    backgroundColor: '#ffffff', 
    borderRadius: 8, 
    padding: 15, 
    marginBottom: 10,
    elevation: 2,
  },
  taskText: { fontSize: 18, color: '#00796b' },
  buttonContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 10 
  },
  editButton: {
    backgroundColor: '#ffeb3b',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: { 
    color: '#ffffff', 
    fontWeight: 'bold' 
  },
});

export default HomeScreen;
