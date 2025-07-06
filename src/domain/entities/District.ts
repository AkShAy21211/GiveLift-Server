export interface GeoJSON {
    type: "Polygon" | "MultiPolygon";
    coordinates: [number, number];
  }
  
  export interface District extends Document {
    name: string;
    state: string;
    geojsonBoundary?: GeoJSON;
    createdAt?: Date;
    updatedAt?: Date;
  }