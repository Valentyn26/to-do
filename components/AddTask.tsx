"use client";

import { addTaskToList, fetchTaskLists } from "@/firebase/task";
import { useState } from "react";
import Button from "./UI/Button";
import { useTaskLists } from "@/contexts/TaskListsContext";
import Input from "./UI/Input";

interface AddTaskProps {
    listId: string;
}

export default function AddTask({ listId }: AddTaskProps) {
    const { setLists } = useTaskLists();
    const [taskName, setTaskName] = useState("");

    const handleAdd = () => {
        if (!taskName.trim()) return;
        const newTask = {
            id: Date.now(),
            name: taskName,
            completed: false
        };

        addTaskToList(listId, newTask);
        setTaskName("");
        fetchTaskLists(setLists);
    };

    return (
        <div className="flex gap-2 mt-4">
            <Input
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <Button
                onClick={handleAdd}
            >
                Add
            </Button>
        </div>
    );
}
