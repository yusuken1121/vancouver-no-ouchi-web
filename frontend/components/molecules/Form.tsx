"use client";

import apiClient from "@/config/apiClient";
import { useState } from "react";

const MyForm = () => {
  const [name, setName] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const options = ["", "Not started", "In progress", "Done"];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/test", {
        title: name,
        selectedValue,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Failed to send the data", error);
    }
  };
  console.log("selectedValue:::", selectedValue, "name:::", name);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">title</label>
      <input
        id="title"
        className="text-black"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="progress">Choose a progress status:</label>
      <select
        id="progress"
        value={selectedValue}
        onChange={handleChange}
        className="p-2 text-black border rounded"
      >
        {options.map((o, index) => {
          return (
            <option key={index} value={o}>
              {o}
            </option>
          );
        })}
      </select>
      <br />
      <br />
      <button className="bg-slate-500 rounded-md p-2" type="submit">
        Submit
      </button>
    </form>
  );
};

export default MyForm;
