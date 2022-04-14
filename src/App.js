import { useState, useEffect } from 'react'
function App() {
  const [listTodo, setListTodo] = useState([])
  const [listTodoFilter, setListTodoFilter] = useState([])

  function addToDoList(todo) {
    const newList = [...listTodo, {
      ...todo,
      id: (new Date()).getTime()
    }]
    console.log({ newList });
    setListTodo(newList)
  }

  const [search, setSearch] = useState('')

  useEffect(() => {
    setListTodoFilter(listTodo.filter((item) => {
      return item.title.includes(search)
    }))
  }, [search, listTodo])

  const [itemChecked, setItemChecked] = useState([])

  const isShowBottom = itemChecked.length > 0

  function deleteChecked() {
    //i o day la item id
    const listCheckedArrIds = itemChecked.map((i) => i.id)
    const newList = listTodo.filter((_item) => {
      return !listCheckedArrIds.includes(_item.id)
    })
    setListTodo(newList)
    setItemChecked([])
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
      <InputToDo
        onTodo={(todo) => {
          addToDoList(todo)
        }} />

      <div>
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
        {
          listTodoFilter.map((item, index) => {
            const isCheck = itemChecked.map(i => i.id).includes(item.id)
            return <TodoItem

              isCheck={isCheck}


              onCheckItem={(isCheck) => {
                // them or xoa item checked
                if (isCheck) {
                  // them
                  const newItemsChecked = [...itemChecked, item]
                  setItemChecked(newItemsChecked)
                } else {
                  // xoa
                  const newItemsChecked = itemChecked.filter((_item) => {
                    return _item.id !== item.id
                  })
                  setItemChecked(newItemsChecked)
                }
              }}

              onRemove={() => {
                setListTodo(listTodo.filter((_item) => {
                  return item.id !== _item.id
                }))
              }}

              onUpdate={
                (todo) => {
                  const newList = [...listTodo]
                  const index = newList.findIndex((_item) => {
                    return _item.id === item.id
                  })

                  if (index !== -1) {
                    newList[index] = {
                      ...todo,
                      id: todo.id
                    }
                    setListTodo(newList)
                  }
                }
              }

              todo={item} />

          }
          )}

        {
          isShowBottom &&

          <div>
            <button onClick={deleteChecked}>Delete All</button>
          </div>


        }

      </div>



    </div>
  )
}

function TodoItem({ todo, onRemove, onUpdate, onCheckItem, isCheck }) {
  const [edit, setEdit] = useState(false)

  return <div>
    <input
      value={isCheck}
      onChange={(e) => {
        const _check = e.target.value
        onCheckItem(_check === 'false')
      }}
      type="checkbox" />
    <p>{todo.title}</p>
    <button onClick={() => {
      setEdit((prev) => {
        return !prev
      })
    }}>Detail</button>

    {
      edit && <InputToDo
        initTitle={todo.title}
        initDescription={todo.description}
        initDueDate={todo.dueDate}
        initPriority={todo.priority}
        onTodo={(todo) => {
          // update
          onUpdate(todo)
          setEdit(false)
        }} />
    }

    <button onClick={() => {
      // remove item
      onRemove()

    }}>Remove</button>
  </div>
}

function InputToDo({
  onTodo,
  initTitle,
  initDescription,
  initDueDate,
  initPriority
}) {
  const [title, setTitle] = useState(initTitle)
  const [description, setDescription] = useState(initDescription)
  const [dueDate, setDueDate] = useState(initDueDate)
  const [priority, setPriority] = useState(initPriority);

  const options = [
    { label: 'low', value: 'low' },
    { label: 'normal', value: 'normal' },
    { label: 'high', value: 'high' },
  ];

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  function saveToDoList() {
    onTodo({
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority
    })
    setTitle('')
    setDescription('')
    setDueDate('')
    setPriority('')
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column"
      }} >
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.currentTarget.value)
        }} />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.currentTarget.value)
        }} />

      <input
        value={dueDate}
        onChange={
          (e) => {
            setDueDate(e.target.value)
          }
        }
        type="date" />

      <Dropdown
        options={options}
        value={priority}
        onChange={handleChange}
      />

      <button
        onClick={saveToDoList}
      > {initTitle ? 'Update' : 'Add New To Do'}</button>
    </div>
  );
}

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};

export default App;
