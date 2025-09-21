import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveCountainer} from 'recharts'; 

interface RegionalChartProps{
    data:Array <{
        region:string;
        total_revenue: number;
        total_sales: number;
    }>;
}

const RegionalChart: React.FC<RegionalChartProps> = ({data}) => {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US',{
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits:0
        }).format(value);
    };

    return(
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div classNmae="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Regional Performance</h3>
                   <p className="text-sm text-gray-600">Revenue by region</p>
            </div>

            <div classNmae="h-80">
                <ResponsiveCountainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top:5, right:30, left: 20, bottom:5}}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                        <XAxis
                        dataKey="region"
                        stroke="#6b7280"
                        fontSize={12}
                        />
                        <YAxis
                        tickFormatter ={formatCurrency}
                        stroke="#6b7280"
                        fontSize={12}
                        />
                        <Tooltip
                        formatterr={([value]: [number]) => [formatCurrency(value), 'Revenue']}
                        lablFormatter ={(label) => `Region: ${label}`}
                        contentStyle={{
                            backgoundColor: "#f9fafb",
                            border: '1px soild #e5e7eb',
                            borderRedius: '0.375rem'
                        }}
                        />
                        <Bar
                        dataKey="total_revenue"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveCountainer>
            </div>
        </div>
    );
};

export default RegionalChart;