import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, Activity } from 'lucide-react';
import { format, addMinutes, addDays } from 'date-fns';
import Chart from './components/Chart';
import StockList from './components/StockList';
import type { StockData, ChartData, CandlestickData } from './types';

// Mock data generation
const generateMockStocks = (): StockData[] => {
  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META', 'TSLA', 'NVDA', 'AMD'];
  return symbols.map(symbol => ({
    symbol,
    price: Math.random() * 1000 + 100,
    change: (Math.random() * 10) - 5,
    volume: Math.floor(Math.random() * 10000000)
  }));
};

const generateTimeSeriesData = (): ChartData[] => {
  const data: ChartData[] = [];
  let value = 100;
  const startDate = new Date();
  
  for (let i = 0; i < 100; i++) {
    value += Math.random() * 2 - 1;
    // Add i days to ensure unique timestamps
    const date = addDays(startDate, i);
    data.push({
      time: format(date, 'yyyy-MM-dd'),
      value
    });
  }
  return data;
};

const generateCandlestickData = (): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let basePrice = 100;
  const startDate = new Date();
  
  for (let i = 0; i < 50; i++) {
    const open = basePrice + Math.random() * 2 - 1;
    const close = open + Math.random() * 2 - 1;
    const high = Math.max(open, close) + Math.random();
    const low = Math.min(open, close) - Math.random();
    basePrice = close;
    
    // Add i days to ensure unique timestamps
    const date = addDays(startDate, i);
    
    data.push({
      time: format(date, 'yyyy-MM-dd'),
      open,
      high,
      low,
      close
    });
  }
  return data;
};

function App() {
  const [stocks] = useState<StockData[]>(generateMockStocks());
  const [selectedStock, setSelectedStock] = useState<string>('AAPL');
  const [timeSeriesData] = useState<ChartData[]>(generateTimeSeriesData());
  const [candlestickData] = useState<CandlestickData[]>(generateCandlestickData());

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">HFT Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Chart
              data={timeSeriesData}
              type="line"
              title={`${selectedStock} Price Movement`}
            />
            <Chart
              data={candlestickData}
              type="candlestick"
              title={`${selectedStock} Candlestick Chart`}
            />
          </div>
          <div>
            <StockList stocks={stocks} onSelect={setSelectedStock} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;