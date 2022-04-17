import React, { useState, useEffect } from 'react'
import TaskInfo from "../../TaskInfo/TaskInfo"
import "./styles.css"

const Task = (props) => {
    const { task, onRemoveTask, onUpdateTask, onSelectingTask } = props;
    const [isViewingDetail, setViewingDetail] = useState(false);
    const [isSelected, setSelected] = useState(false);

    const [isOverDueDate, setOverDueDate] = useState(false);

    useEffect(() => {
        onSelectingTask(task.id, isSelected);
    }, [isSelected, onSelectingTask, task.id]);

    const removeTask = (e) => {
        onRemoveTask(e.target.id);
    }

    const seeTaskDetail = () => {
        setViewingDetail(prevState => !prevState);
    }

    const updateTask = (task) => {
        onUpdateTask(task);
        setViewingDetail(prevState => !prevState);
    }

    const handleSelecting = () => {
        setSelected(prevState => {
            return !prevState;
        });
    }

    return (
        <div>
            <div className="task-preview-container">
                <label className="task-container">{task.name}
                    <input type="checkbox" onChange={handleSelecting} />
                    <span className="checkmark"></span>
                </label>
                <div className="right">
                    <button className='btn blue-btn' onClick={seeTaskDetail} id={task.id}>{isViewingDetail ? "Hide" : "Detail"}</button>
                    <button className='btn red-btn' onClick={removeTask} id={task.id}>Remove</button>
                </div>
            </div>
            {isViewingDetail &&
                <div className="task-detail-pane">
                    <TaskInfo task={task} onAddTask={null} onUpdateTask={updateTask} />
                </div>
            }
        </div>
    )
}

export default Task