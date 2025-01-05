export interface PackageCategory {
  id: string;
  name: string;
  description: string;
}

export interface PackageType {
  id: string;
  name: string;
  description: string;
}

export interface AdminPackage {
  id: string;
  name: string;
  type: string;
  category: string;
  viewCount: number;
  price: number;
  discount?: number;
  description: string;
  isActive: boolean;
  sortOrder: number;
}
