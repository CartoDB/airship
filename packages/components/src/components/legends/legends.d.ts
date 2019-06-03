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
interface GradientData extends LegendData {
  type: 'polygon';
  color?: string;
  label: string;
}
