"use client";
import apiClient from "@/config/apiClient";
import { NotionPage } from "@/types/notionTypes";
import { useEffect, useState } from "react";

export function useFetchPropertyData() {
  const [properties, setProperties] = useState<NotionPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await apiClient.get("/properties");
        const data = response.data;
        setProperties(data);
      } catch (error) {
        setError("Failed to fetch the properties.");
        console.error("Failed to fetch the properties: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);
  return { properties, loading, error };
}
