"use client";

import { useState, useEffect } from 'react';
import { type Temperature } from '@/types';
import ReactEChartsClient from '@/components/react-echarts-client';

const fetchTemperatures = async (): Promise<Temperature[]> => {
  const response = await fetch('/api/temperature');
  const data = await response.json();

  return data;
};

const TemperatureLineChart = () => {
  const [data, setData] = useState<Temperature[]>([]);

  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      const newData = await fetchTemperatures();
      setData(newData.reverse());
    };

    fetchDataAndUpdate();

    const intervalId = setInterval(fetchDataAndUpdate, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const getOption = () => (
    {
      title: {
        text: 'Live Temperature',
        left: '1%'
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '5%',
        right: '15%',
        bottom: '10%'
      },
      xAxis: {
        type: 'category',
        data: data.map(item => new Date(item.created_at).toLocaleTimeString())
      },
      yAxis: {
        type: 'value',
        name: 'Temperature (°C)'
      },
      toolbox: {
        right: 10,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: [
        {},
        {
          type: 'inside'
        }
      ],
      visualMap: {
        top: 50,
        right: 10,
        pieces: [
          { lte: 10, color: '#0099FF' },
          { gt: 10, lte: 18, color: '#4CAF50' },
          { gt: 18, lte: 26, color: '#FFC107' },
          { gt: 26, lte: 32, color: '#FF9800' },
          { gt: 32, color: '#F44336' }
        ],
        outOfRange: {
          color: '#999'
        }
      },
      series: [
        {
          name: 'Temperature',
          type: 'line',
          data: data.map(item => item.temperature),
        }
      ]
    });

  if (data.length === 0) {
    return <div>Loading chart data...</div>;
  }

  return (
    <ReactEChartsClient
      option={getOption()}
      style={{ height: '600px', width: '100%' }}
      opts={{ renderer: 'svg' }}
      theme="dark"
    />
  );
}

export default TemperatureLineChart;