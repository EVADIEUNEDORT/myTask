import { Task } from "../../interface/task"; 

export type RootStackParamList = {
    Home: undefined;
    AddTask: undefined;
    EditTask: { taskId: string }; // Paramètre pour l'écran d'édition
};
