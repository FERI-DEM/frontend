import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CardBarChart() {
  let config = {
    type: 'bar',
    data: {
      labels:  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          label: `${new Date().getFullYear()}`,
          backgroundColor: '#ed64a6',
          borderColor: '#ed64a6',
          data: [30, 78, 56, 34, 100, 45, 13],
          fill: false,
          barThickness: 8,
        },
        {
          label: `${new Date().getFullYear() - 1}`,
          fill: false,
          backgroundColor: '#4c51bf',
          borderColor: '#4c51bf',
          data: [27, 68, 86, 74, 10, 4, 87],
          barThickness: 8,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      title: {
        display: false,
        text: 'Orders Chart',
      },
      tooltips: {
        // mode: 'index',
        intersect: false,
      },
      hover: {
        // mode: 'nearest',
        intersect: true,
      },
      legend: {
        labels: {
          fontColor: 'rgba(0,0,0,.4)',
        },
        align: 'end',
        position: 'bottom',
      },
      scales: {
        x: {
          display: false,
          title: {
            display: true,
            text: 'Month',
          },
          grid: {
            borderDash: [2],
            borderDashOffset: [2],
            color: 'rgba(33, 37, 41, 0.3)',
            zeroLineColor: 'rgba(33, 37, 41, 0.3)',
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
          },
        },

        y: {
          display: false,
          title: {
            display: false,
            text: 'Value',
          },
          grid: {
            borderDash: [2],
            drawBorder: false,
            borderDashOffset: [2],
            color: 'rgba(33, 37, 41, 0.2)',
            zeroLineColor: 'rgba(33, 37, 41, 0.15)',
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
          },
        },
      },
    },
  };

  React.useEffect(() => {
    // let ctx = document.getElementById('bar-chart').getContext('2d');
    // window.myBar = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-slate-400 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-slate-700 text-xl font-semibold">
                Total orders
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            {/* <canvas id="bar-chart"></canvas> */}
            <Bar data={config.data} options={config.options} />
          </div>
        </div>
      </div>
    </>
  );
}
