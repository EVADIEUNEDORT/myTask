import React, { createContext, useContext, useState } from "react";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../interface/task";

// Définir la forme du contexte avec CRUD
type TaskContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (newTask: Task) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
};

// Créer un contexte avec des valeurs par défaut
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Créer un hook personnalisé pour utiliser TaskContext
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext doit être utilisé dans un TaskProvider");
  }
  return context;
};

// Composant Provider pour le contexte des tâches
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fonction pour ajouter une tâche
  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Fonction pour mettre à jour une tâche
  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  // Fonction pour supprimer une tâche
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
