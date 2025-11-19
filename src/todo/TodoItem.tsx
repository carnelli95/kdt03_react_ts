import React, { useState } from "react";
import TailButton from "../component/TailButton";
import { supabase } from "../supabase/client";

export default function TodoItem({ todo, todos, setTodos }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

  const handleToggle = async () => {
    const { error } = await supabase
      .from("todos")
      .update({ completed: !todo.completed })
      .eq("id", todo.id);
    if (error) {
      console.error("Error toggling todo:", error);
    } else {
      getTodos();
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEdit(false);
  };

  const handleSave = () => {
    const newTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, text: editText } : t
    );
    setTodos(newTodos);
    setIsEdit(false);
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("todos").delete().eq("id", todo.id);
    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      getTodos();
    }
  };

  const getTodos = async () => {
    const resp = await fetch(
      `${supabaseUrl}/rest/v1/todos?select=*&order=id.desc`,
      {
        method: "GET",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );
    if (resp.ok) {
      const data = await resp.json();
      setTodos(data);
    } else {
      console.error("Error fetching todos:", resp.statusText);
      setTodos([]);
    }
  };

  return (
    <div className="flex justify-between items-center w-3/4 p-2 border-b">
      <input
        type="checkbox"
        className="w-5 h-5 cursor-pointer"
        checked={todo.completed}
        onChange={handleToggle}
      />

      <div className="flex-1 mx-4">
        {isEdit ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          <span
            className={`flex-1 p-2 ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {isEdit ? (
          <>
            <TailButton caption="확인" color="lime" onHandle={handleSave} />
            <TailButton caption="취소" color="orange" onHandle={handleCancel} />
          </>
        ) : (
          <>
            <TailButton caption="수정" color="lime" onHandle={handleEdit} />
            <TailButton caption="삭제" color="orange" onHandle={handleDelete} />
          </>
        )}
      </div>
    </div>
  );
}
