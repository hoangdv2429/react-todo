import React from 'react'
import Task from "./Task"

const TaskList = (props) => {
    const {toDoList, onRemoveTask, onUpdateTask, onSelectingTask, isSearching} = props;
    return (
        <div className="task-list">
            {
                !toDoList?.length ?
                (
                    isSearching ? 
                    <div className="congrat-container">
                        <img src="../assets/No-search-result.jpeg" alt="no result" />
                        <h1>No task is found</h1>
                        <p>Please try another search value</p>
                    </div>
                    :
                    <div className="congrat-container">
                        <img src="../assets/Congratulation.jpeg" alt="congratulation" />
                        <h1>Congratulations</h1>
                        <p>You've done every task</p>
                    </div>
                )
                :
                toDoList?.map(task => <Task key={task.id} task={task} onRemoveTask={onRemoveTask} onUpdateTask={onUpdateTask} onSelectingTask={onSelectingTask} />)
            }
        </div>
    )
}

export default TaskList;