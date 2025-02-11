"use client";

import { addTaskToList, fetchTaskLists } from "@/firebase/task";
import { useState } from "react";
import Button from "./UI/Button";
import { useTaskLists } from "@/contexts/TaskListsContext";
import Input from "./UI/Input";
import { useUserContext } from "@/contexts/UserContext";

interface AddTaskProps {
    listId: string;
    onAdd: (taskName: string) => void;
}

export default function AddTask({ listId, onAdd }: AddTaskProps) {
    const { user } = useUserContext();
    const [taskName, setTaskName] = useState("");

    function handleAdd() {
        onAdd(taskName);
        setTaskName("");
    }

    return (
        <div className="flex gap-2 mt-4">
            <Input
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            {user?.role === "admin" && <Button onClick={handleAdd}>Add</Button>}
        </div>
    );
}
