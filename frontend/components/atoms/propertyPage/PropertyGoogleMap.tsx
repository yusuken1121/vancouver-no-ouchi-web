// "use client";

// import React, { useMemo, useState } from "react";
// import {
//   GoogleMap,
//   LoadScript,
//   OverlayView,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { Card, CardContent } from "@/components/ui/card";
// import { Home } from "lucide-react";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// type Coordinates = {
//   geoPosition: string;
// };

// const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY =
//   process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

// export default function PropertyGoogleMap({ geoPosition }: Coordinates) {
//   const { lat, lng } = useMemo(() => {
//     const [lat, lng] = geoPosition.split(",").map(Number);
//     return { lat, lng };
//   }, [geoPosition]);

//   const center = useMemo(() => ({ lat, lng }), [lat, lng]);
//   const markerPosition = center;
//   const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(true);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//   });

//   // ここをskeltonに変更する
//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }

//   return (
//     // <LoadScript googleMapsApiKey={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={15}
//       options={{
//         disableDefaultUI: true,
//         zoomControl: true,
//       }}
//     >
//       {/* Card Overlay */}
//       <OverlayView
//         position={markerPosition}
//         mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//         getPixelPositionOffset={(width, height) => ({
//           x: -(width / 2),
//           y: -(height + 35), // Homeアイコンの上部にCardを配置するために調整
//         })}
//       >
//         <Card className="mb-2 bg-white shadow-lg rounded-lg w-[240px] relative">
//           <div className="p-3 text-sm text-gray-700">
//             具体的な所在地は予約後に表示されます。
//           </div>
//           {/* Triangle pointer */}
//           <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-white" />
//         </Card>
//       </OverlayView>

//       {/* Home Icon Overlay */}
//       <OverlayView
//         position={markerPosition}
//         mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//         getPixelPositionOffset={(width, height) => ({
//           x: -(width / 2),
//           y: -(height / 2),
//         })}
//       >
//         <div className="flex items-center justify-center w-32 h-32 rounded-full bg-themeColor bg-opacity-55">
//           <div
//             className="flex items-center justify-center w-8 h-8 rounded-full bg-themeColor cursor-pointer"
//             onClick={() => setIsInfoWindowOpen(!isInfoWindowOpen)}
//           >
//             <Home className="w-6 h-6 text-white" />
//           </div>
//         </div>
//       </OverlayView>
//     </GoogleMap>
//     // </LoadScript>
//   );
// }

// "use client";

// import React, { useCallback, useMemo, useState } from "react";
// import {
//   GoogleMap,
//   GoogleMapProps,
//   OverlayView,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { Card } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Home } from "lucide-react";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// type Coordinates = {
//   geoPosition: string;
// };

// const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY =
//   process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
// // "";

// export default function PropertyGoogleMap({ geoPosition }: Coordinates) {
//   const { lat, lng } = useMemo(() => {
//     const [lat, lng] = geoPosition.split(",").map(Number);
//     return { lat, lng };
//   }, [geoPosition]);

//   const center = useMemo(() => ({ lat, lng }), [lat, lng]);
//   const markerPosition = center;
//   const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(true);
//   // const [zoomLevel, setZoomLevel] = useState(15); // 初期ズームレベル

//   // Memoize the loader options to optimize caching
//   const mapApiOptions = useMemo(
//     () => ({
//       googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//       id: "google-map-script", // Ensure the script is loaded only once
//     }),
//     []
//   );

//   const { isLoaded, loadError } = useJsApiLoader(mapApiOptions);

//   // const handleZoomChanged = useCallback((map: google.maps.Map) => {
//   //   setZoomLevel(map.getZoom() || 15); // ズームレベルを取得
//   // }, []);

//   // Error handling when the map fails to load
//   if (loadError) {
//     return <div>Error loading Google Maps. Please try again later.</div>;
//   }

//   // Display a skeleton while the map is loading
//   if (!isLoaded) {
//     return <Skeleton className="w-full h-[400px]" />;
//   }

//   return (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={15}
//       options={{
//         disableDefaultUI: true,
//         zoomControl: true,
//       }}
//     >
//       {/* Card Overlay */}
//       <OverlayView
//         position={markerPosition}
//         mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//         getPixelPositionOffset={(width, height) => ({
//           x: -(width / 2),
//           y: -(height + 35),
//         })}
//       >
//         <Card className="mb-2 bg-white shadow-lg rounded-lg w-[240px] relative">
//           <div className="p-3 text-sm text-gray-700">
//             具体的な所在地は予約後に表示されます。
//           </div>
//           {/* Triangle pointer */}
//           <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-white" />
//         </Card>
//       </OverlayView>

//       {/* Home Icon Overlay */}
//       <OverlayView
//         position={markerPosition}
//         mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//         getPixelPositionOffset={() => ({
//           // x: -(width / 2),
//           // y: -(height / 2),
//           x: 0,
//           y: 0,
//         })}
//       >
//         <div className="flex items-center justify-center w-32 h-32 rounded-full bg-themeColor bg-opacity-55">
//           <div
//             className="flex items-center justify-center w-8 h-8 rounded-full bg-themeColor cursor-pointer"
//             onClick={() => setIsInfoWindowOpen(!isInfoWindowOpen)}
//           >
//             <Home className="w-6 h-6 text-white" />
//           </div>
//         </div>
//       </OverlayView>
//     </GoogleMap>
//   );
// }
