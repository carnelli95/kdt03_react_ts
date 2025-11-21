import { useState } from "react";
import type { Todo } from "./todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEdit(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEdit(false);
  };

  return (
    <div className="flex justify-between items-center w-3/4 p-2 border-b">
      <input
        type="checkbox"
        className="w-5 h-5 cursor-pointer"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <div className="flex-1 mx-4">
        {isEdit ? (
          <input
            type="text"
            className="border px-2 py-1 rounded w-full"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
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
            <button className="bg-lime-500 px-2 py-1 rounded" onClick={handleSave}>
              확인
            </button>
            <button className="bg-orange-500 px-2 py-1 rounded" onClick={handleCancel}>
              취소
            </button>
          </>
        ) : (
          <>
            <button className="bg-lime-500 px-2 py-1 rounded" onClick={() => setIsEdit(true)}>
              수정
            </button>
            <button className="bg-blue-500 px-2 py-1 rounded" onClick={() => onDelete(todo.id)}>
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
}
