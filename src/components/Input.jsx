import React from "react";

const Input = ({ label, id, name, value, onChange, error }) => {
  return (
    <div className="input-container">
      <label htmlFor={id} className="text-xl font-mono">
        {label}
      </label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="border-b-2 rounded-md py-2 px-1 outline-none"
      />
      <p className="error">{error}</p>
    </div>
  );
};

export default Input;
