"use client";

import { TaskList } from "@/types/task";
import { useState } from "react";
import Input from "./UI/Input";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import Button from "./UI/Button";

interface TaskListItemProps {
    list: TaskList;
    onEditName: (id: string, newName: string) => void;
    onDelete: (id: string) => void;
}

export default function TaskListItem({ list, onEditName, onDelete }: TaskListItemProps) {
    const [newName, setNewName] = useState(list.name);
    const [isEditing, setIsEditing] = useState(false);


    const handleEditName = () => {
        onEditName(list.id, newName);
        setIsEditing(false);
    };

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

                {isEditing ? (
                    <Button onClick={handleEditName} color="green">Save</Button>
                ) : (
                    <Button onClick={() => setIsEditing(true)} color="blue">Edit</Button>
                )}
                <Button onClick={() => onDelete(list.id)} color="red">Delete</Button>
            </div>

            <AddTask listId={list.id} />

            <div className="mt-4">
                {list.tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        listId={list.id}
                    />
                ))}
            </div>
        </div>
    );
}
