import React from 'react';
import {LineChart, Line, XAxis, YAxis,CartesianGrid, Tooltip,ResponsiveContainer } from 'recharts';
import {format, parseISO} from 'data-fus';

interface RevenueChartProps {
    data: Array<{
        data: string;
        revenue: number;
        sales_count: number;
    }>;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
    const formatDate = (dateString: string) => {
        try{
            return format(parseISO(dateString), 'MMM dd');
        } catch {
            return dateString;
        }
    };

    const formatCurrency =(value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits:0
        }).format(value);
    };

    return(
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue Trand</h3>
                <p classNmae="tewxt-sm text-gray-600">Daily revenue over the selected period</p>
            </div>

            <div classNmae="h-80"> 
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{top:5, right:30, left:20, bottom:5}}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                        dataKey="date"
                        tickFormatter = {formatDate}
                        stroke="#6b7280"
                        fontSize={12}
                        />
                        <YAxis
                        tickFormatter={formatCurrency}
                        stroke="#6b7280"
                        fontSize={12}
                        />
                        <Tooltip
                        lablFormatter ={(value) => `Date: ${formatDate(value)}`}
                        formatter = {([value]: [number]) => [formatCurrency(value), 'Revenue']}
                        contentStyle={(
                            backgroundColor:' #f9fafb',
                            border: '1px soild #e5e7eb',
                            borderRedius: '0.375rem'
''                        )}
                        />
                        <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#3b82f6"
                        stockeWidth={2}
                        dot={{fill: "#3b82f6", stockWidth: 2, r:4}}
                        ActiveDot={{r:6, stocke: '#3b82f6', strokeWidth:2}}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
export default RevenueChart;