import React, { useState } from 'react'
import "./styles.css"


const TaskInfo = (props) => {

    const { task, onAddTask, onUpdateTask } = props;

    const [currentTask, setCurrentTask] = useState(task);
    const [newTask, setNewTask] = useState({ id: "", name: "", description: "", date: getToday(), priority: "Normal", viewing: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (task) {
            setCurrentTask(prevState => {
                return {
                    ...prevState,
                    [name]: value
                }
            })
        } else {
            setNewTask(prevState => {
                return {
                    ...prevState,
                    [name]: value
                }
            })
        }
    }

    const addTask = (e) => {
        e.preventDefault();
        onAddTask(newTask);
        resetNewTask();
    }

    const updateTask = (e) => {
        e.preventDefault();
        onUpdateTask(currentTask);
    }

    const resetNewTask = () => {
        setNewTask({ id: "", name: "", description: "", date: "", priority: "Normal", viewing: false });
    }

    function getToday() {
        return new Date().toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }

    return (
        <form action="" onSubmit={currentTask ? updateTask : addTask}>
            <div><input type="text" placeholder={currentTask ? '' : 'Add a new task...'} name="name" className="max-width" value={currentTask ? currentTask.name : newTask.name} onChange={handleChange} required /></div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={currentTask ? currentTask.description : newTask.description} onChange={handleChange} rows="5" />
            </div>
            <div className="inline">
                <div>
                    <label htmlFor="date">Due Date</label>
                    <input type="date" id="date" name="date" min={getToday()} className="max-width" value={currentTask ? currentTask.date : newTask.date} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="priority">Priority</label>
                    <select id="priority" name="priority" className="max-width" value={currentTask ? currentTask.priority : newTask.priority} onChange={handleChange}>
                        <option value="Important">Important</option>
                        <option value="Normal">Normal</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
            </div>
            <button className="btn green-btn max-width" type="submit">{currentTask ? "Update" : "Add"}</button>
        </form>
    )
}

export default TaskInfo