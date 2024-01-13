import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart,CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend} from 'chart.js'
Chart.register(CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend);
  
const IncomeChart = ({ monthlyIncomeData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const labels = Object.keys(monthlyIncomeData);
      const data = Object.values(monthlyIncomeData);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Monthly Income',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: data,
          },
        ],
      };

      // Destroy the previous chart instance if it exists
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      // Create a new chart instance
      chartRef.current.chartInstance = new Chart(chartRef.current.chartInstance.getContext('2d'), {
        type: 'bar',
        data: chartData,
        options: {
          title: {
            display: true,
            text: 'Monthly Income Chart',
          },
        },
      });
    }
  }, [monthlyIncomeData]);

  return (
    <div>
      <h2>Monthly Income Chart</h2>
      <Bar ref={chartRef} data={{}} /> {/* Provide an empty data object initially */}
    </div>
  );
};

export default IncomeChart;
