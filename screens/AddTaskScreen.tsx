import React, { useState } from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { RootStackParamList } from './navigation/types';
import { useTaskContext } from '../context/useTaskContext';

type AddTaskProps = NativeStackScreenProps<RootStackParamList, "AddTask">;

const AddTaskScreen: React.FC<AddTaskProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const { setTasks } = useTaskContext();

  const handleAddTask = () => {
    if (title.trim()) {
      setTasks((prevTasks) => [...prevTasks, { id: uuidv4(), title }]);
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please enter a task title');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#e0f7fa' },
  input: {
    height: 50,
    borderColor: '#00796b',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default AddTaskScreen;
