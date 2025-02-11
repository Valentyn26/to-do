import { useEffect, useState } from "react";
import Button from "./UI/Button";
import Input from "./UI/Input";
import { addTaskList, deleteTaskList, fetchTaskLists, updateTaskList } from "@/firebase/task";
import TaskListItem from "./TaskListItem";
import { useTaskLists } from "@/contexts/TaskListsContext";
import { useUserContext } from "@/contexts/UserContext";


export default function TaskLists() {
    const { user } = useUserContext();
    const { lists, setLists } = useTaskLists();
    const [newListName, setNewListName] = useState("");

    useEffect(() => {
        fetchTaskLists(setLists);
    }, []);

    const handleAddList = async () => {
        if (newListName) {
            await addTaskList(newListName);
            setNewListName("");
            fetchTaskLists(setLists);
        }
    };

    const handleEditListName = async (id: string, newName: string) => {
        await updateTaskList(id, newName);
        fetchTaskLists(setLists);
    };

    const handleDeleteList = async (id: string) => {
        await deleteTaskList(id);
        fetchTaskLists(setLists);
    };


    return (
        <section>
            <h1 className="font-bold text-center">Task Lists</h1>
            <div>New Task List</div>
            <div className="flex gap-x-3">
                <Input
                    type="text"
                    name="newList"
                    placeholder="Enter list name"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                />
                {user?.role === "admin" && <Button onClick={handleAddList}>Add List</Button>}
            </div>
            <div>
                {lists.map((list) => (
                    <TaskListItem
                        key={list.id}
                        list={list}
                        onEditName={handleEditListName}
                        onDelete={handleDeleteList}
                    />
                ))}
            </div>
        </section>
    )
}