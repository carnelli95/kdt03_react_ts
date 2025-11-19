import React, { useRef } from "react";
import TailButton from "../component/TailButton";
import { supabase } from "../supabase/client";

export default function TodoInput({ todo, todos, setTodos, handleSave }) {
  const inRef = useRef();

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

  return (
    <div className="flex justify-center items-center w-3/4 p-5 my-5">
      <input
        type="text"
        ref={inRef}
        className="flex-1 p-2 border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="새로운 할 일을 입력하세요"
      />
      <TailButton caption="추가" color="blue" onHandle={handleAdd} />
    </div>
  );
}
