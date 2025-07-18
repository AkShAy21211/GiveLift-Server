import axios from "axios";
import ENVS from "../config/envConfig.js";

const GOOGLE_MAPS_API_KEY = ENVS.GOOGLE_MAP_API_KEY;

export async function geocodeAddress(address: string) {
  if (!address || address.length < 3) return null;
  try {
    const googleURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${GOOGLE_MAPS_API_KEY}`;
    const res = await axios.get(googleURL);

    if (res.data.results?.length) {
      const { lat, lng } = res.data.results[0].geometry.location;
      return [ lat, lng ];
    }
  } catch (err: any) {
    console.error("Google geocoding failed:", err.message);
    throw new Error("Google geocoding failed")
  }

  return null;
}
