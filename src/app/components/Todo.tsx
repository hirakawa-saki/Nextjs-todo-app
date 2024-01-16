"use client";
import { editTodo } from '@/api';
import { useRef } from 'react';
import { Task } from '@/types';
import { deleteTodo } from '@/api';
import React, { useEffect, useState } from 'react'

interface TodoProps {
  todo: Task;
}

const Todo = ({ todo }: TodoProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskTitle, setEditedTitle] = useState(todo.text);

  useEffect(() => {
    if(isEditing)
    {
      ref.current?.focus();
    }
    
  },[isEditing]);

  const handleEdit = async () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    await editTodo(todo.id,editedTaskTitle,todo.date);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  return (
    <li key={todo.id} className="flex justify-between p-4 bg-white border-l-4 border-blue-500 shadow">
      {isEditing ? (
        <input
        ref={ref}
        type="text"
        className="mr-2 py-1 px-2 rounded border-gray-400 border"
        value={editedTaskTitle}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>setEditedTitle(e.target.value)
        }
  />
      ) : <span>{todo.text}　{todo.date && `  ${formatDate(todo.date)}`}</span>}
      <div>
        {isEditing ? (<button className="text-blue-500 mr-3" onClick={handleSave}>save</button>) : (<button className="text-green-500 mr-3" onClick={handleEdit}>edit</button>)}
        <button className='text-red-500' onClick={handleDelete}>Delete</button>
      </div>
    </li>
  )
}

export default Todo;
