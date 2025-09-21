import React from 'react';
import {package} from 'lucide-react';
interface TopProductsTableProps{
    products: Array<{
        name:string;
        category: string;
        total_quantity: number;
        total_revenue: number;
    }>;
}

const TopProductsTable: React.FC<TopProductsTableProps> = ({products}) => {
    const formatCurrency
     =(amount: number) =>{
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency :'USD'
        }).format(amount);
     };

     return(
        <div classNmae="bg-white rounded-lg shadow-sm p-6">
            <div classNAme="flex items-center mb-6">
                <package className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold rext-gary-900">Top Products</h3>
            </div>
            <div classNmea="overflow-hidden">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Product </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Category </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"> Quantity </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"> Revenue </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gary-200">
                        {products.slice(0, 5).map(products, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="font-medium text-gray-900">{products.name}</div>
                                </td>
                                <td classNmae="px-4 py-4 whitesspace-nowrap">
                                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 texy-blue-800 rounded-full">
                                        {product.category}
                                    </span>
                                </td>
                                <td classNmae="px-4 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
                                    {formatCurrency(products.total_revenue)}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
     );
};
export default TopProductsTable;