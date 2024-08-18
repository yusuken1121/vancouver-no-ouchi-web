"use client";

import { useState } from "react";

const MyForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5050/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="text-black"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="bg-slate-500 rounded-md p-2" type="submit">
        Submit
      </button>
    </form>
  );
};

export default MyForm;
