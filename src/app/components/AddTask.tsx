"use client";

import { addTodo } from '@/api';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    await addTodo({ id: uuidv4() ,text:taskTitle,date:new Date(taskDate)});
    setTaskTitle("");
  }

  return (
    <form className="mb-4 space-y-3" onSubmit={handleSubmit}>
      <label htmlFor="title">タイトル</label>
      <input type="text"
      name="title"
      className="w-full border px-4 pt-2 rounded-lg focus:outline-none focus:border-blue-400" onChange={(e:ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)
      }
      value={taskTitle}
      />
      <label htmlFor="date">期限</label>
      <input type="date"
      name="date"
      className="w-full border px-4 pt-2 rounded-lg focus:outline-none focus:border-blue-400" onChange={(e:ChangeEvent<HTMLInputElement>) => setTaskDate(e.target.value)
      }
      value={taskDate}
      />
      <button className="w-full px-4 py-2 text-white bg-blue-500 rounded transform hover:bg-blue-400 hover:scale-95 duration-200">Add Task</button>
    </form>
    );
  };
  
  export default AddTask;
