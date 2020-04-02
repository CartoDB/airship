export interface Category {
  name: string;
  value: number;
  color?: string;
}
export interface CategoryOptions {
  maximumValue: number;
  weight?: number | string;
  isOther?: boolean;
}
