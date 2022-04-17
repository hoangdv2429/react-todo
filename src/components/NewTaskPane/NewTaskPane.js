import React from 'react'
import TaskInfo from "../TaskInfo/TaskInfo"
import "./styles.css"

const NewTaskPane = (props) => {

    const { onAddTask } = props;

    return (
        <div className='container left-separator'>
            <h3>New Task</h3>
            <TaskInfo task={null} onAddTask={onAddTask} onUpdateTask={null}/>
        </div>
    )
}

export default NewTaskPane