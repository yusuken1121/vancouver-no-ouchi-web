import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL || "http://localhost:3000", // API server
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClientFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASEURL || "http://localhost:3000";

  const { headers, ...restOptions } = options;
  const response = await fetch(`${baseURL}${endpoint}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// example: POST method
// const newProperty = {
//   name: "New Property",
//   price: 1000,
// };
// const response = await apiClientFetch("/properties", {
//   method: "POST",
//   body: JSON.stringify(newProperty),
// });
