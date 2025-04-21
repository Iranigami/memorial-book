export const COLORS = [
    { name: "hellosummer", color: "#57caff" },
    { name: "grape", color: "#8b36ff" },
    { name: "cyberpink", color: "#ff2370" },
    { name: "butterscotch", color: "#ffbb45" }
  ];
  
export type Data = {
  name: string;
  label: string;
  color: string;
  total: number;
  partial: number;
}[];

export const DATA: Data = [
  { name: "", label: "SAF", color: COLORS[0].color, total: 50, partial: 12.5 },
  { name: "", label: "DAC", color: COLORS[1].color, total: 50, partial: 12.5 },
  { name: "", label: "GH", color: COLORS[2].color, total: 50, partial: 12.5 },
  { name: "", label: "LDES", color: COLORS[3].color, total: 50, partial: 12.5 }
];
