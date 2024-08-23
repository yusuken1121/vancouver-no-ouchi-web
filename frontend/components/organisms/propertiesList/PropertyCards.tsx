"use client";
import PropertyCard from "@/components/molecules/propertiesList/PropertyCard";
import apiClient from "@/config/apiClient";
import React, { useEffect, useState } from "react";

const PropertyCards = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await apiClient.get("/properties");
        const data = response.data;
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch the properties: ", error);
      }
    };
    fetchProperties();
  }, []);
  console.log(properties);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
    </div>
  );
};

export default PropertyCards;
