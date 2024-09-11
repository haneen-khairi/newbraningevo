import { useJsApiLoader } from "@react-google-maps/api";

export default function GoogleMapsLoader({ children }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ["drawing", "places", "maps"]
  });

  if (!isLoaded) return null;

  return <>{children}</>;
}
