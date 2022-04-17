import React, { useState } from 'react'
import NewTaskPane from './components/NewTaskPane/NewTaskPane'
import TaskListPane from './components/TaskListPane/TaskListPane'
import "./index.css"

const App = () => {

    const toDoListString = localStorage.getItem("toDoList");
    const [toDoList, setToDoList] = useState(toDoListString?.length ? JSON.parse(localStorage.getItem("toDoList")) : []);
    try {
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
    } catch (e) {
        alert('Quota exceeded!, please delete some tasks'); //data wasn't successfully saved due to quota exceed so throw an error
    }

    const addTask = (newTask) => {
        newTask.id = `${toDoList.length + 1}`
        setToDoList(prevState => {
            let updatedList = [];
            if (prevState.length === 0) updatedList.push(newTask);
            else {
                for (let i = 0; i < prevState.length; i++) {
                    if (prevState[i].date < newTask.date) {
                        updatedList.push(prevState[i]);
                    } else {
                        updatedList.push(newTask);
                        updatedList.push(prevState[i]);
                    }
                    if (updatedList.length === prevState.length) {
                        updatedList.push(newTask);
                    }
                }
            }
            return updatedList;
        })
    }

    const updateTask = (task) => {
        let updatedList = [];
        for (let i = 0; i < toDoList.length; i++) {
            updatedList.push(task.id === toDoList[i].id ? task : toDoList[i]);
        }
        setToDoList(updatedList);
    }

    const removeTask = (taskID) => {
        setToDoList(prevState => prevState.filter(task => task.id !== taskID));
    }

    const removeTasks = (taskIDs) => {
        setToDoList(prevState => prevState.filter(task => !taskIDs.includes(task.id)));
    }

    return (
        <div className="page-container">
            <NewTaskPane
                onAddTask={addTask}
            />
            <TaskListPane
                toDoList={toDoList}
                onRemoveTask={removeTask}
                onRemoveTasks={removeTasks}
                onUpdateTask={updateTask}
            />
        </div>
    )
}

export default App