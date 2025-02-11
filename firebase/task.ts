import { collection, addDoc, doc, updateDoc, deleteDoc, arrayUnion, arrayRemove, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Task, TaskList } from "@/types/task";
import { Dispatch, SetStateAction } from "react";

export const addTaskList = async (name: string) => {
    try {
        const newTaskList = {
            name: name,
            tasks: []
        };

        const docRef = await addDoc(collection(db, "taskLists"), newTaskList);
    } catch (e) {
        console.error("Error adding task list: ", e);
    }
};

export const updateTaskList = async (taskListId: string, newName: string) => {
    try {
        const taskListRef = doc(db, "taskLists", taskListId);

        await updateDoc(taskListRef, {
            name: newName
        });
    } catch (e) {
        console.error("Error updating task list: ", e);
    }
};

export const deleteTaskList = async (taskListId: string) => {
    try {
        const taskListRef = doc(db, "taskLists", taskListId);

        await deleteDoc(taskListRef);
    } catch (e) {
        console.error("Error deleting task list: ", e);
    }
};


export const addTaskToList = async (listId: string, task: Task) => {
    const listRef = doc(db, "taskLists", listId);

    try {
        await updateDoc(listRef, {
            tasks: arrayUnion(task)
        });
    } catch (error) {
        console.error("Error adding task: ", error);
    }
};

export const updateTaskInList = async (listId: string, taskId: number, updatedTask: Task) => {
    const listRef = doc(db, "taskLists", listId);

    try {
        const listDoc = await getDoc(listRef);
        const listData = listDoc.data() as TaskList;
        const updatedTasks = listData.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedTask } : task
        );

        await updateDoc(listRef, {
            tasks: updatedTasks
        });
    } catch (error) {
        console.error("Error updating task: ", error);
    }
};

export const deleteTaskFromList = async (listId: string, taskId: number) => {
    const listRef = doc(db, "taskLists", listId);

    try {
        const listDoc = await getDoc(listRef);
        if (!listDoc.exists()) {
            console.error("List not found!");
            return;
        }

        const listData = listDoc.data() as TaskList;
        const updatedTasks = listData.tasks.filter((task) => task.id !== taskId);
        await updateDoc(listRef, {
            tasks: updatedTasks
        });
    } catch (error) {
        console.error("Error deleting task: ", error);
    }
};

export const fetchTaskLists = async (setLists: Dispatch<SetStateAction<TaskList[]>>) => {
    const taskListsSnapshot = await getDocs(collection(db, "taskLists"));
    const taskListsData = taskListsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    setLists(taskListsData as TaskList[]);
};