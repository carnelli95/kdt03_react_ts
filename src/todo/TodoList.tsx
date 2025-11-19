import React, { useState, useEffect, useRef } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import TailButton from '../component/TailButton';
import { supabase } from "../supabase/client";

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [completed, setCompleted] = useState(0);
    const [incompleted, setInCompleted] = useState(0);

    const inRef = useRef();


    const getTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: false });
      if (error) {
        console.error("Error fetching todos:", error);
      } else {
        setTodos(data);
      }
    };

    useEffect(() => {
        //문자열 -> 자바스크립트 객체 : JSON.parse()
       getTodos();
    }, []);

    useEffect(() => {
        setCompleted(todos.filter(todo => todo.completed).length);
        setInCompleted(todos.filter(todo => !todo.completed).length);
    }, [todos]);

    const handleAdd = async () => {
      if (inRef.current.value == "") {
        alert("값을 입력해 주세요.");
        inRef.current.focus();
        return;
      }
      const { data, error } = await supabase
        .from("todos")
        .insert([{ text: inRef.current.value, completed: false }]);
      if (error) {
        console.error("Error adding todo:", error);
      } else {
        getTodos();
        inRef.current.value = "";
        inRef.current.focus();
      }
    };

    return (
      <div className="flex flex-col w-full justify-center items-center m-5">
        <h1 className="text-2xl max-w-3xl font-bold text-center">
          할일목록(Supabase Client 라이브러리사용)
        </h1>

        <TodoInput todos={todos} setTodos={setTodos} handleSave={handleAdd} />

        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
    );
}
