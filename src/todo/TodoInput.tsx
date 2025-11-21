import { useRef } from "react";

interface TodoInputProps {
  handleSave: (text: string) => void;
}

export default function TodoInput({ handleSave }: TodoInputProps) {
  const inRef = useRef<HTMLInputElement>(null);

  const onAdd = () => {
    const value = inRef.current?.value ?? "";

    if (value.trim() === "") {
      alert("값을 입력해 주세요.");
      inRef.current?.focus();
      return;
    }

    handleSave(value);
    if (inRef.current) {
      inRef.current.value = "";
      inRef.current.focus();
    }
  };

  return (
    <div className="flex justify-center items-center w-3/4 p-5 my-5">
      <input
        type="text"
        ref={inRef}
        className="flex-1 p-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="새로운 할 일을 입력하세요"
      />
      <button
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={onAdd}
      >
        추가
      </button>
    </div>
  );
}
