import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import type { ChartData, CandlestickData } from '../types';

interface ChartProps {
  data: ChartData[] | CandlestickData[];
  type: 'line' | 'candlestick';
  title: string;
}

const Chart: React.FC<ChartProps> = ({ data, type, title }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { color: '#ffffff' },
          textColor: '#333',
        },
        grid: {
          vertLines: { color: '#f0f0f0' },
          horzLines: { color: '#f0f0f0' },
        },
        width: chartContainerRef.current.clientWidth,
        height: 400,
      });

      if (type === 'line') {
        const lineSeries = chart.addLineSeries({
          color: '#2563eb',
          lineWidth: 2,
        });
        lineSeries.setData(data as ChartData[]);
      } else {
        const candlestickSeries = chart.addCandlestickSeries({
          upColor: '#26a69a',
          downColor: '#ef5350',
          borderVisible: false,
          wickUpColor: '#26a69a',
          wickDownColor: '#ef5350',
        });
        candlestickSeries.setData(data as CandlestickData[]);
      }

      chart.timeScale().fitContent();
      chartRef.current = chart;

      return () => {
        chart.remove();
      };
    }
  }, [data, type]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default Chart;