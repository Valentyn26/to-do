"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { TaskList } from "@/types/task";

interface TaskListsContextType {
    lists: TaskList[];
    setLists: React.Dispatch<React.SetStateAction<TaskList[]>>;
}

const TaskListsContext = createContext<TaskListsContextType | undefined>(undefined);

export function TaskListsProvider({ children }: { children: React.ReactNode }) {
    const [lists, setLists] = useState<TaskList[]>([]);

    return (
        <TaskListsContext.Provider value={{ lists, setLists }}>
            {children}
        </TaskListsContext.Provider>
    );
}

export function useTaskLists() {
    const context = useContext(TaskListsContext);
    if (!context) {
        throw new Error("useTaskLists must be used within a TaskListsProvider");
    }
    return context;
}
