import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import type { Todo } from "./todo";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setTodos(data as Todo[]);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleAdd = async (text: string) => {
    const { error } = await supabase
      .from("todos")
      .insert([{ text, completed: false }]);

    if (!error) {
      getTodos();
    }
  };

  const handleToggle = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const { error } = await supabase
      .from("todos")
      .update({ completed: !todo.completed })
      .eq("id", id);

    if (!error) getTodos();
  };

  const handleEdit = async (id: number, newText: string) => {
    const { error } = await supabase
      .from("todos")
      .update({ text: newText })
      .eq("id", id);

    if (!error) getTodos();
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (!error) getTodos();
  };

  return (
    <div className="flex flex-col w-full justify-center items-center m-5">
      <h1 className="text-2xl max-w-3xl font-bold text-center">
        할일 목록 (TypeScript + Supabase)
      </h1>

      <TodoInput handleSave={handleAdd} />

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
