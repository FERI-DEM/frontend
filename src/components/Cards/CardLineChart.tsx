import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function CardLineChart() {
  let mainChartColors: any = {};

  if (document.documentElement.classList.contains('dark')) {
    mainChartColors = {
      borderColor: '#374151',
      labelColor: '#9CA3AF',
      opacityFrom: 0,
      opacityTo: 0.15,
    };
  } else {
    mainChartColors = {
      borderColor: '#F3F4F6',
      labelColor: '#6B7280',
      opacityFrom: 0.45,
      opacityTo: 0,
    };
  }

  const [options, setOptions] = useState({
    chart: {
      height: 420,
      type: 'area' as 'area',
      fontFamily: 'Inter, sans-serif',
      foreColor: mainChartColors.labelColor,
      animations: {
        enabled: true,
      },
      toolbar: {
        show: true,
      },
    },
    fill: {
      type: 'gradient' as 'gradient',
      gradient: {
        enabled: true,
        opacityFrom: mainChartColors.opacityFrom,
        opacityTo: mainChartColors.opacityTo,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
      },
    },
    grid: {
      show: true,
      borderColor: mainChartColors.borderColor,
      strokeDashArray: 1,
      padding: {
        left: 35,
        bottom: 15,
      },
    },
    series: [
      {
        name: 'Dejanska proizvodnja',
        data: [6356, 6218, 6156, 6526, 6556, 6725, 6424, 6356, 6586, 6756, 6616, null, null, null],
        color: '#1A56DB',
      },
      {
        name: 'Napoved proizvodnje',
        data: [6556, 6725, 6424, 6356, 6586, 6756, 6616, 6356, 6218, 6156, 6526, 6556, 6725, 6424],
        color: '#FDBA8C',
      },
    ],
    markers: {
      size: 5,
      strokeColors: '#ffffff',
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    xaxis: {
      categories: [
        '01 Apr',
        '02 Apr',
        '03 Apr',
        '04 Apr',
        '05 Apr',
        '06 Apr',
        '07 Apr',
        '08 Apr',
        '09 Apr',
        '10 Apr',
        '11 Apr',
        '12 Apr',
        '13 Apr',
        '14 Apr',
      ],
      labels: {
        style: {
          colors: [mainChartColors.labelColor],
          fontSize: '14px',
          fontWeight: 500,
        },
      },
      axisBorder: {
        color: mainChartColors.borderColor,
      },
      axisTicks: {
        color: mainChartColors.borderColor,
      },
      crosshairs: {
        show: true,
        position: 'back' as 'back',
        stroke: {
          color: mainChartColors.borderColor,
          width: 1,
          dashArray: 10,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [mainChartColors.labelColor],
          fontSize: '14px',
          fontWeight: 500,
        },
        formatter: function (value: any) {
          return value != null ? `${value} Wh` : '';
        },
      },
    },
    legend: {
      fontSize: '14px',
      fontWeight: 500,
      fontFamily: 'Inter, sans-serif',
      labels: {
        colors: [mainChartColors.labelColor],
      },
      itemMargin: {
        horizontal: 10,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  });

  return (
    <>
      <Chart options={options} series={options.series} type="area" height={420} width={'100%'} />
    </>
  );
}
