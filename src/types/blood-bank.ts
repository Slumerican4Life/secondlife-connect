
export type BloodDollStatus = "available" | "resting" | "meeting" | "hunting";

export interface BloodDoll {
  id: number;
  name: string;
  image: string;
  bloodType: string;
  rarity: string;
  status: BloodDollStatus;
  price: number;
  age: number;
  lastFed: string;
}
