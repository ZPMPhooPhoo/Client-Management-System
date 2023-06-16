import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from 'axios';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const BarChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://127.0.0.1:8000/api/customer-chart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;

      const labels = data.map((item: any) => item.month);
      const customerCount = data.map((item: any) => item.customer_count);


      setChartData({
        labels,
        datasets: [
          {
            label: "Clients",
            data: customerCount,
            fill: true,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "#e96f28",
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const yMax = 200;
  const yStepSize = Math.ceil(yMax / 10);

  return (
    <div className="BarChart">
      <div className="chart-container">
        <div className="chart-size">
          {chartData ? (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Clients by Month" },
                },
                scales: {
                  y: {
                    max: yMax,
                    beginAtZero: true,
                    ticks: {
                      stepSize: yStepSize,
                    },
                  },
                },
              }}
            />
          ) : (
            <div>Loading chart data...</div>
          )}
        </div>
      </div>
    </div>
  );
};