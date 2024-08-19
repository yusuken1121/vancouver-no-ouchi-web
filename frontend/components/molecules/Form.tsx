"use client";

import apiClient from "@/config/apiClient";
import { SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { PrimarySelect } from "../atoms/PrimarySelect";
import PrimaryCalender from "../atoms/PrimaryCalender";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const MyForm = () => {
  const [name, setName] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const statusOptions = ["Not started", "In progress", "Done"];

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
        phoneNumber,
        email,
        url,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Failed to send the data", error);
    }
  };
  console.log("selectedValue:::", selectedValue, "name:::", name);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/3 flex flex-col gap-y-4 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
    >
      <h1 className="">List</h1>
      <Label htmlFor="title">title</Label>
      <Input
        id="title"
        className="text-black w-48"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Label htmlFor="progress">Choose a progress status:</Label>
      <PrimarySelect
        handleChange={handleChange}
        placeholder="Select"
        labelName="progress"
        selectItems={statusOptions}
      />

      <Label htmlFor="startDate">Choose the start date</Label>
      <PrimaryCalender id="startDate" date={date} setDate={setDate} />

      <Label htmlFor="phone">Enter your phone number</Label>
      <Input
        id="phone"
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="phone number"
      />

      <Label htmlFor="email">Enter your email</Label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />

      <Label htmlFor="url">Enter your url</Label>
      <Input
        id="url"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="url"
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default MyForm;
