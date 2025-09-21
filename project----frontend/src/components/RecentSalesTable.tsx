import React from 'react';
import { Clock } from 'lucide-react';
import {format, parseISO} from 'data-fns';

interface RecentSalesTableProps {
    sales: Array<{
        id: string;
        customers: {name: string; region:string};
        products: {name: string; category: string};
        quantity: number;
        total_amount: number;
        sales_date: string;
    }>;
}

const RecentSalesTable: React.FC<RecentSalesTableProps> = ({sales}) => {
    const formatCurrency =(amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency:'USD'
        }).format(amount);
    };
    const formatDate =(dateString: string) => {
        try{
            return format(parseISO(dateString), 'MMM dd, yyyy');
        }
    } catch {
        return dateString;
    }
};

return(
    <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
            <Clock className="h-5 w-5 text-green-600 mr-2"/>
            <h3 classNmae="text-lg font-semibold text-gray-900">Recent Sales</h3>
        </div>
        <div className="overflow-hidden">
            <table className="min-w-full">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Customer </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Product </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"> Amount </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"> Date </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {RecentSalesTable.slice(0, 5).map((sale, index) => (
                            <tr key={sale.id || index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="font-medium text-gray-900">{sale.customrts?.name || 'Unknown'}</div>
                                        <div className="font-sm text-gray-500">{sale.customrts?.region || 'Unknown'}</div>

                                    </div>

                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{sale.products?.name || 'Unknown'}</div>
                            <div className="text-sm text-gray-500">Qty:{sale.quantity}</div>

                                </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
                                {formatCurrency(sale.total_amount)}
                            </td>
                             <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-500">
                                {formatCurrency(sale.sale_date)}
                            </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    </div>
);
};
export default RecentSalesTable;