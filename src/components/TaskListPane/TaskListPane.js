import React, {useState, useEffect} from 'react'
import TaskList from "./Task/TaskList"
import "./styles.css"

const TaskListPane = (props) => {
  const { toDoList, onRemoveTask, onUpdateTask, onRemoveTasks } = props;

  const [ selecting, setSelecting ] = useState([]);
  const [ displayList, setDisplayList ] = useState(toDoList);
  const [ searchValue, setSearchValue ] = useState("");

  const handleSelecting = (taskID, isSelected) => {
    if (isSelected) {
      setSelecting(prevState => [...prevState, taskID]);
    } else {
      setSelecting(prevState => prevState.filter(item => item !== taskID));
    }
  }

  const removeTasks = () => {
    onRemoveTasks(selecting);
    setSelecting([]);
  }

  const search = (e) => {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    setDisplayList(toDoList.filter(task => task.name.includes(searchValue)));
  }, [searchValue, toDoList])

  return (
    <div className="container">
      <h3>Todo List</h3>
      <input type="text" className='max-width' placeholder="Search" onChange={search} value={searchValue}/>
      <TaskList toDoList={displayList} onRemoveTask={onRemoveTask} onUpdateTask={onUpdateTask} onSelectingTask={handleSelecting} onRemoveTasks={removeTasks} isSearching={searchValue ? true : false}/>
      {!selecting?.length ?
        null :
        <div className="multiple-select-action">
          <p>Bulk Action</p>
          <button className="btn blue-btn">Done</button>
          <button className="btn red-btn" onClick={removeTasks}>Remove</button>
        </div>
      }
    </div>
  )
}

export default TaskListPane