import React, { useEffect, useState } from 'react'
import TodoCard from './TodoCard';

const TaskManager = () => {

  const [ todos, setTodos ] = useState([]);
  const [ input, setInput ] = useState('');
  const [ menu, setMenu ] = useState('All');
  const [ active, setActive ] = useState(true);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(todos);
  }, []);

  const handleAll = () => {
    setMenu('All');
  }

  const handleActive = () => {
    setMenu('Active');
    setActive(true);
  }

  const handleCompleted = () => {
    setMenu('Completed');
    setActive(false);
  }

  const handleTodo = () => {

    if (input.trim() === "") {
      return alert('please fill');
    }

    const rNumber = (Math.random() * 10);

    const newTodo = {
      id: rNumber,
      todo: input,
      Active: true
    }

    todos.push(newTodo);

    localStorage.setItem('todos', JSON.stringify(todos));
    setInput('');
  }

  // delete handle
  const deleteTodo = (id) => {
    console.log(id);
    const todos = JSON.parse(localStorage.getItem('todos'));

    const upatedTodos = todos.filter((item) => item.id !== id);

    setTodos(upatedTodos);
    localStorage.setItem('todos', JSON.stringify(upatedTodos));
  }

  // active handle
  const handleActive_Complete = (id) => {
    const updated = todos.map((item) => (
      item.id === id ? { ...item, Active: !item.Active } : item
    ))
    console.log(updated);
    setTodos(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  }

  return (
    <div className='flex justify-center'>
      <div className='w-3/6'>
        <div className='border py-7 px-5 mt-10 rounded border-gray-400 mb-7'>
          <input onChange={(e) => setInput(e.target.value)} value={input} className='border w-100 py-2 rounded mr-4 pl-3 text-sm outline-none' type="text" placeholder='Add Your Todo'/>
          <button onClick={handleTodo} className='bg-green-400 px-7 py-2.5 rounded font-semibold active:opacity-50 transition-all text-white text-sm'>Add</button>
        </div>

        {/* menu */}
        <div className='flex justify-center my-10'>
          <div className='w-fit flex gap-7'>

            <button onClick={handleAll} className={`py-1 px-3 rounded  text-sm font-semibold ${menu === 'All' ? 'bg-sky-400 text-white' : 'bg-gray-400 text-black '}`}>All</button>

            <button onClick={handleActive} className={`py-1 px-3 rounded  text-sm font-semibold ${menu === 'Active' ? 'bg-sky-400 text-white' : 'bg-gray-400 text-black '}`}>Active</button>
            
            <button onClick={handleCompleted} className={`py-1 px-3 rounded  text-sm font-semibold ${menu === 'Completed' ? 'bg-sky-400 text-white' : 'bg-gray-400 text-black '}`}>Completed</button>

          </div>
        </div>

        {/* display */}
        <div>
          <ul className=' flex flex-col gap-3 bg-white'>

            {
            
              todos.filter((item) => (menu === 'All' ? true : item.Active === active)).map((item, index) => (
                <TodoCard key={index} todoObject={item} onDelete={deleteTodo} onActive={handleActive_Complete}/>
              ))
              
            }

          </ul>
        </div>
      </div>
    </div>
    
  )
}

export default TaskManager;