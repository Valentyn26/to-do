"use client";

import { Task, TaskList } from "@/types/task";
import { useState } from "react";
import Input from "./UI/Input";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import Button from "./UI/Button";
import { useUserContext } from "@/contexts/UserContext";
import { addTaskToList, fetchTaskLists } from "@/firebase/task";
import { useTaskLists } from "@/contexts/TaskListsContext";

interface TaskListItemProps {
    list: TaskList;
    onEditName: (id: string, newName: string) => void;
    onDelete: (id: string) => void;
}

export default function TaskListItem({ list, onEditName, onDelete }: TaskListItemProps) {
    const { user } = useUserContext();
    const { setLists } = useTaskLists();
    const [newName, setNewName] = useState(list.name);
    const [isEditing, setIsEditing] = useState(false);

    const [tasks, setTasks] = useState<Task[]>(list.tasks);

    function handleEditName() {
        onEditName(list.id, newName);
        setIsEditing(false);
    };

    function handleAdd(taskName: string) {
        if (!taskName.trim()) return;
        const newTask = {
            id: Date.now(),
            name: taskName,
            completed: false
        };

        addTaskToList(list.id, newTask);
        setTasks([...tasks, newTask]);
        fetchTaskLists(setLists);
    };

    function handleSave(newTask: Task) {
        setTasks(tasks.map(task => {
            if (task.id === newTask.id) return newTask;
            else return task;
        }));
    };

    function handleDelete(id: number) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <div className="border p-4 rounded shadow-md">
            <div className="flex gap-x-4 items-center mb-4">
                {isEditing ? (
                    <Input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                ) : (
                    <h2>{list.name}</h2>
                )}

                {user?.role === "admin" && (
                    isEditing ? (
                        <Button onClick={handleEditName} color="green">Save</Button>
                    ) : (
                        <Button onClick={() => setIsEditing(true)} color="blue">Edit</Button>
                    )
                )}
                {user?.role === "admin" &&
                    <Button onClick={() => onDelete(list.id)} color="red">Delete</Button>
                }
            </div>



            <AddTask listId={list.id} onAdd={handleAdd} />

            <div className="mt-4">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        listId={list.id}
                        onDelete={handleDelete}
                        onSave={handleSave}
                    />
                ))}
            </div>
        </div>
    );
}
