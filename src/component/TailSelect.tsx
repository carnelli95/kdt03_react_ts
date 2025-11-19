import React, { forwardRef } from 'react';

const TailSelect = forwardRef(({ id, title, opk, opv, onHandle }, ref) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
        {title}
      </label>
      <select
        id={id}
        ref={ref}       
        onChange={onHandle}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value="">선택</option>
        {opk.map((k, idx) => (
          <option key={idx} value={k}>{opv[idx]}</option>
        ))}
      </select>
    </div>
  );
});

export default TailSelect;
