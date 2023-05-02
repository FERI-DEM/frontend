import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ChartLine({
  dataset,
  displayRange,
}: {
  dataset: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  displayRange?: { min?: number; max?: number };
}) {
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
        enabled: false,
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
    markers: {
      size: 0,
      strokeColors: '#ffffff',
      hover: {
        size: 5,
        sizeOffset: 3,
      },
    },
    xaxis: {
      type: 'datetime' as 'datetime',
      min: displayRange?.min ?? undefined,
      max: displayRange?.max ?? undefined,
      labels: {
        style: {
          colors: [mainChartColors.labelColor],
          fontSize: '14px',
          fontWeight: 500,
        },
        formatter: function (value: any) {
          return value != null ? `${new Date(value).toLocaleString()}` : '';
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
      <Chart options={options} series={dataset} type="area" height={420} width={'100%'} />
    </>
  );
}
