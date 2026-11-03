export type EmissionsRating = 'euro 1' | 'euro 2' | 'euro 3' | 'euro 4' | 'euro 5' | 'euro 6' | 'zero emissions';

export type VehicleFeature = 'USB-A' | 'USB-C' | 'WiFi' | 'announcements' | 'flip-dot internal screens' | 'TV internal screens';

export type VehicleStatus = 'service-worthy' | 'off-road' | 'away' | 'trainer' | 'auxillary';

export interface ImageMetadata {
  url: string;
  title?: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
}

export interface Vehicle {
  id: string;
  registration: string;
  fleetNumber: string;
  vehicleType: string;
  engineType: string;
  gearboxType: string;
  chassisType: string;
  livery: string;
  branding: string;
  emissionsRating: EmissionsRating;
  features: VehicleFeature[];
  history: string;
  vehicleDelivered: string;
  vehicleJoinedFleet: string;
  status: VehicleStatus;
  primaryPhoto: string;
  primaryPhotoMetadata?: ImageMetadata;
  photoAlbum: ImageMetadata[];
  liveryImage: string;
  liveryImageMetadata?: ImageMetadata;
  reviews: Review[];
  featured?: boolean;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  rating: number;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  headerImage: string;
  photoAlbum: string[];
  body: string;
  author: string;
  linkedVehicleId?: string;
  relatedVehicleIds?: string[];
  categories?: string[];
  tags?: string[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}
