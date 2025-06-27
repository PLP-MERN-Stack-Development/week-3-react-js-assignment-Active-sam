import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'

const TodoCard = ({ todoObject, onDelete, onActive }) => {

  return (
    <li className='flex justify-between px-4 py-5 rounded bg-gray-200'>
      <span className='flex gap-3'>
        <input className='text-red-400' onClick={() => onActive(todoObject.id)} type="checkbox" checked={todoObject.Active === false ? true : ''}/>
        <p className='text-sm font-semibold'>{todoObject.todo}</p>
      </span>
      <span onClick={() =>onDelete(todoObject.id)} className='w-4 h-fit'>
        <Trash2 size={20} className='text-gray-500 '/>
      </span>
    </li> 
  )
}

export default TodoCard;