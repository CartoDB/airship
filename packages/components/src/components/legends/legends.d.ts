interface LegendData {
  type: 'point' | 'line' | 'polygon';
  color?: string;
  marker?: string;
  strokeColor?: string;
  strokeStyle?: string;
  strokeWidth?: number;
  label: string;
  width: number;
}
interface GradientData {
  color?: string;
  label: string;
}