import Coordinates from 'ol/coordinate';

export type Parking = {
  type: string;
  properties: ParkingProperties;
  geometry: ParkingGeometry;
};

export type ParkingProperties = {
  street: string;
  spots: number;
  handicappedSpots: number;
  paid: boolean;
  index: number;
};

type ParkingGeometry = {
  type: string;
  coordinates: Coordinates[][][];
};
