import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { StockData } from '../types';

interface StockListProps {
  stocks: StockData[];
  onSelect: (symbol: string) => void;
}

const StockList: React.FC<StockListProps> = ({ stocks, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Stock List</h2>
      <div className="space-y-2">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => onSelect(stock.symbol)}
          >
            <div>
              <h3 className="font-semibold">{stock.symbol}</h3>
              <p className="text-sm text-gray-500">Vol: {stock.volume.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${stock.price.toFixed(2)}</p>
              <p className={`text-sm flex items-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {stock.change.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockList;