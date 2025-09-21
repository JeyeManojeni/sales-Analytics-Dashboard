import React from 'react';
import {TrendingUp, DollarSign, ShoppingCart, Users} from 'lucide-react';

interface StatsProps {
    data: {
        totalRevenue: number;
        totalSales: number;
        averageOrderValue: number;
    };
}

const DashboardStats: React.FC<StatsProps> = ({data}) => {
    const formatCurreny = (amount : number) => {
        return new Intl.NumberFormat('en-US' {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const stats = [
        {
        name: 'Total Revenue',
        value: formatCurreny(data.totalRevenue || 0),
        icon: DollarSign,
        color: 'bg-green-500',
        change: '+12,5%',
        changeType: 'Positive'
    },
    {
        name: 'Total Sales',
        value: (data.totalSales || 0).toLocaleString(),
        icone: ShoppingCart,
        change: '+8.2%',
        changeType: 'positivie'
    },
    {
        name: 'Average Order Value',
        value: formatCurrency(data.averageOrderValue || 0),
        icon: TrendingUp,
        color: 'bg-purple-500',
        change:'+4.1%',
        changeType: 'positive'
    },
    {
        name:'Active Customers',
        value: '1,429',
        icon: Users,
        color: 'bg-orange-500',
        change:'+2.3%',
        changeType: 'positive'
    }
];

return(
    <div className="grid grid-cols-1 md:gris-cols-2 lg:grid-cols-4 gap-6">
{stats.map((stat) => (
    <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.name}</p>
                <p className="text-3xl font-bold text-gary-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last period</span>
                </div>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white"/>
            </div>
        </div>
    </div>
))}

    </div>
);
};

export default DashboardStats;