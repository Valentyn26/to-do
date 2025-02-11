export interface TaskList {
    id: string;
    name: string;
    tasks: Task[];
}

export interface Task {
    id: number;
    name: string;
    completed: boolean;
}