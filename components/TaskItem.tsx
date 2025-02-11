"use client";

import { useTaskLists } from "@/contexts/TaskListsContext";
import { deleteTaskFromList, fetchTaskLists, updateTaskInList } from "@/firebase/task";
import { Task } from "@/types/task";
import { useState } from "react";
import Button from "./UI/Button";
import Input from "./UI/Input";
import { useUserContext } from "@/contexts/UserContext";

interface TaskItemProps {
    task: Task;
    listId: string;
}

export default function TaskItem({ task, listId }: TaskItemProps) {
    const { user } = useUserContext();
    const { setLists } = useTaskLists();
    const [isEditing, setIsEditing] = useState(false);
    const [taskName, setTaskName] = useState(task.name);
    const [isCompleted, setIsCompleted] = useState(task.completed);

    const handleSave = () => {
        updateTaskInList(listId, task.id, { ...task, name: taskName, completed: isCompleted });
        setIsEditing(false);
        fetchTaskLists(setLists);
    };

    const handleDelete = () => {
        deleteTaskFromList(listId, task.id)
        fetchTaskLists(setLists);
    }

    return (
        <div className="flex items-center gap-x-5 p-2 border rounded-lg shadow">
            <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => {
                    setIsCompleted(!isCompleted);
                    updateTaskInList(listId, task.id, { ...task, completed: !isCompleted });
                }}
            />

            {isEditing ? (
                <Input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
            ) : (
                <span className={isCompleted ? "line-through text-gray-500" : ""}>
                    {task.name}
                </span>
            )}

            <div className="flex gap-2">


                {user?.role === "admin" && (
                    isEditing ? (
                        <Button onClick={handleSave} color="green">Save</Button>
                    ) : (
                        <Button onClick={() => setIsEditing(true)} color="blue">Edit</Button>
                    )
                )}
                {user?.role === "admin" &&
                    <Button onClick={handleDelete} color="red">Delete</Button>
                }
            </div>
        </div>
    );
}
