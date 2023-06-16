import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function SunChart({ series = [50] }: { series: number[] }) {
    const options = {
        chart: {
            type: 'radialBar' as 'radialBar',
            sparkline: {
                enabled: true,
            },
        },
        colors: ['#E3A008'],
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                dataLabels: {
                    show: false,
                },
            },
        },
    };
    return (
        <>
            <Chart options={options} series={series} type="radialBar" width={'100%'} height={240} />
        </>
    );
}
