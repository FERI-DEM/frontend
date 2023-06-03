import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ChartLine({
    dataset,
    displayRange,
    isDashboard = false,
}: {
    dataset: ApexAxisChartSeries | undefined;
    displayRange?: { min?: number; max?: number };
    isDashboard: boolean;
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

    let defaultYAxis: any = {
        labels: {
            style: {
                colors: [mainChartColors.labelColor],
                fontSize: '14px',
                fontWeight: 500,
            },
            formatter: function (value: any) {
                return value != null ? `${Number(value.toFixed(2)).toLocaleString()} kW` : '';
            },
        },
    };

    if (isDashboard) {
        defaultYAxis = [
            {
                seriesName: 'Proizvodnja',
                show: false,
                labels: {
                    style: {
                        colors: [mainChartColors.labelColor],
                        fontSize: '14px',
                        fontWeight: 500,
                    },
                    formatter: function (value: any) {
                        return value != null ? `${Number(value.toFixed(2)).toLocaleString()} kW` : '';
                    },
                },
            },
            {
                seriesName: 'Napoved proizvodnje',
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#FDBA8C',
                },
                labels: {
                    style: {
                        colors: [mainChartColors.labelColor],
                        fontSize: '14px',
                        fontWeight: 500,
                    },
                    formatter: function (value: any) {
                        return value != null ? `${Number(value.toFixed(2)).toLocaleString()} kW` : '';
                    },
                },
                title: {
                    text: 'Električna energija',
                    style: {
                        color: '#FDBA8C',
                    },
                },
            },
            {
                seriesName: 'Sončna radiacija',
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#FF1654',
                },
                labels: {
                    style: {
                        colors: [mainChartColors.labelColor],
                        fontSize: '14px',
                        fontWeight: 500,
                    },
                    formatter: function (value: any) {
                        return value != null ? `${Number(value.toFixed(2)).toLocaleString()}` : '';
                    },
                },
                title: {
                    text: 'Sončna radiacija',
                    style: {
                        color: '#FF1654',
                    },
                },
            },
        ];
    }

    return (
        <>
            <Chart
                options={{
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
                                        exportToCSV: 'Prenesi CSV',
                                        exportToPNG: 'Prenesi PNG',
                                        exportToSVG: 'Prenesi SVG',
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

                        events: {
                            beforeZoom: (chartContext: any, { xaxis }: any) => {
                                let dateFrom: Date = null as any;
                                let dateTo: Date = null as any;
                                dataset?.forEach((x) => {
                                    if (x.data && x.data.length > 0) {
                                        const dataFrom: any = x.data[0];
                                        dateFrom =
                                            dateFrom && new Date(dataFrom.x).getTime() - dateFrom.getTime() > 0
                                                ? new Date(dataFrom.x)
                                                : !dateFrom
                                                ? new Date(dataFrom.x)
                                                : dateFrom;

                                        const dataTo: any = x.data[x.data.length - 1];
                                        dateTo =
                                            dateTo && new Date(dataTo.x).getTime() - dateTo.getTime() < 0
                                                ? new Date(dataTo.x)
                                                : !dateTo
                                                ? new Date(dataTo.x)
                                                : dateTo;
                                    }
                                });

                                if (dateFrom && dateTo) {
                                    let maindifference = new Date(dateTo).valueOf() - new Date(dateFrom).valueOf();
                                    let zoomdifference = xaxis.max - xaxis.min;

                                    if (zoomdifference > maindifference) {
                                        return {
                                            xaxis: {
                                                min: dateFrom,
                                                max: dateTo,
                                            },
                                        };
                                    } else {
                                        return {
                                            xaxis: {
                                                min: xaxis.min,
                                                max: xaxis.max,
                                            },
                                        };
                                    }
                                }
                            },
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
                            datetimeUTC: false,
                            style: {
                                colors: [mainChartColors.labelColor],
                                fontSize: '14px',
                                fontWeight: 500,
                            },
                            datetimeFormatter: {
                                year: 'yyyy',
                                month: "MMM 'yy",
                                day: 'dd MMM',
                                hour: 'HH:mm',
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
                    yaxis: defaultYAxis,
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
                    annotations: {
                        xaxis: [
                            {
                                x: new Date().getTime(),
                                borderColor: '#FF1654',
                                borderWidth: 3,
                                label: {
                                    style: {
                                        color: mainChartColors.labelColor,
                                        fontSize: '14px',
                                        fontWeight: 500,
                                    },
                                    text: 'Trenutni čas',
                                },
                            },
                        ],
                    },
                }}
                series={dataset}
                type="area"
                height={420}
                width={'100%'}
            />
        </>
    );
}
