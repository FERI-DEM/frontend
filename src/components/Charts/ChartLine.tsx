import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

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

  const defaultOptions = () => {
    return {
      chart: {
        defaultLocale: 'sl',
        locales: [
          {
            name: 'sl',
            options: {
              months: [
                ...Array.from(Array(12).keys()).map((month) => {
                  let date = new Date();
                  date.setDate(1);
                  date.setMonth(month);
                  return date.toLocaleString('sl-SI', { month: 'long' });
                }),
              ],
              shortMonths: [
                ...Array.from(Array(12).keys()).map((month) => {
                  let date = new Date();
                  date.setDate(1);
                  date.setMonth(month);
                  return date.toLocaleString('sl-SI', { month: 'short' });
                }),
              ],
              days: [
                ...Array.from(Array(7).keys()).map((month) => {
                  let date = new Date();
                  date.setDate(1);
                  date.setMonth(month);
                  return date.toLocaleString('sl-SI', { weekday: 'long' });
                }),
              ],
              shortDays: [
                ...Array.from(Array(7).keys()).map((month) => {
                  let date = new Date();
                  date.setDate(1);
                  date.setMonth(month);
                  return date.toLocaleString('sl-SI', { weekday: 'short' });
                }),
              ],
              toolbar: {
                download: 'Prenesi SVG',
                selection: 'Izbor',
                selectionZoom: 'Povečava izbora',
                zoomIn: 'Približaj',
                zoomOut: 'Oddalji',
                pan: 'Premikanje',
                reset: 'Ponastavi povečavo',
              },
            },
          },
        ],
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
            return value != null ? `${+value.toFixed(2)} kW` : '';
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
    };
  };

  const [options, setOptions] = useState<ApexOptions>(defaultOptions);

  useEffect(() => {
    setOptions(defaultOptions);
  }, [displayRange]);

  return (
    <>
      <Chart options={options} series={dataset} type="area" height={420} width={'100%'} />
    </>
  );
}
