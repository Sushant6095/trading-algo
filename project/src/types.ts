export interface StockData {
  symbol: string;
  price: number;
  change: number;
  volume: number;
}

export interface ChartData {
  time: string;
  value: number;
}

export interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}