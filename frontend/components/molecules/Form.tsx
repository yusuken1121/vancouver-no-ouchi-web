"use client";

import apiClient from "@/config/apiClient";
import { SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { PrimarySelect } from "../atoms/PrimarySelect";
import PrimaryCalender from "../atoms/PrimaryCalender";

const MyForm = () => {
  const [name, setName] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const options = ["Not started", "In progress", "Done"];

  const handleChange = (e: SetStateAction<string>) => {
    setSelectedValue(e);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/test", {
        title: name,
        selectedValue,
        date,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Failed to send the data", error);
    }
  };
  console.log("selectedValue:::", selectedValue, "name:::", name);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
      <label htmlFor="title">title</label>
      <Input
        id="title"
        className="text-black w-48"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="progress">Choose a progress status:</label>

      <PrimarySelect
        handleChange={handleChange}
        placeholder="Select"
        labelName="progress"
        selectItems={options}
      />

      <label htmlFor="startDate">Choose the start date</label>
      <PrimaryCalender id="startDate" date={date} setDate={setDate} />
      <button className="bg-slate-500 rounded-md p-2" type="submit">
        Submit
      </button>
    </form>
  );
};

export default MyForm;
