"use client";

import React, { useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Skeleton } from "@/components/ui/skeleton";

const containerStyle = {
  width: "100%",
  height: "400px",
};

type Coordinates = {
  geoPosition: string;
};

const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function PropertyGoogleMap({ geoPosition }: Coordinates) {
  const { lat, lng } = useMemo(() => {
    const [lat, lng] = geoPosition.split(",").map(Number);
    return { lat, lng };
  }, [geoPosition]);

  const center = useMemo(() => ({ lat, lng }), [lat, lng]);
  const markerPosition = center;

  const mapApiOptions = useMemo(
    () => ({
      googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      id: "google-map-script",
    }),
    []
  );

  const { isLoaded, loadError } = useJsApiLoader(mapApiOptions);

  if (loadError) {
    return <div>Error loading Google Maps. Please try again later.</div>;
  }

  if (!isLoaded) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      <Marker position={markerPosition} />
    </GoogleMap>
  );
}
