import { supabase } from '../config/supabase.js';

// Create tables if they don't exist
export const initializeDatabase = async () => {
  try {
    // Customers table
    const { error: customersError } = await supabase.rpc('create_customers_table');
    if (customersError && !customersError.message.includes('already exists')) {
      console.error('Error creating customers table:', customersError);
    }

    // Products table
    const { error: productsError } = await supabase.rpc('create_products_table');
    if (productsError && !productsError.message.includes('already exists')) {
      console.error('Error creating products table:', productsError);
    }

    // Sales table
    const { error: salesError } = await supabase.rpc('create_sales_table');
    if (salesError && !salesError.message.includes('already exists')) {
      console.error('Error creating sales table:', salesError);
    }

    // Analytics reports table
    const { error: reportsError } = await supabase.rpc('create_analytics_reports_table');
    if (reportsError && !reportsError.message.includes('already exists')) {
      console.error('Error creating analytics reports table:', reportsError);
    }

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Customer operations
export const getCustomers = async () => {
  const { data, error } = await supabase
    .from('customers')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const createCustomer = async (customer) => {
  const { data, error } = await supabase
    .from('customers')
    .insert([customer])
    .select();
  
  if (error) throw error;
  return data[0];
};

// Product operations
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const createProduct = async (product) => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select();
  
  if (error) throw error;
  return data[0];
};

// Sales operations
export const getSales = async (startDate, endDate) => {
  let query = supabase
    .from('sales')
    .select(`
      *,
      customers(name, region, type),
      products(name, category, price)
    `);

  if (startDate && endDate) {
    query = query
      .gte('sale_date', startDate)
      .lte('sale_date', endDate);
  }

  const { data, error } = await query.order('sale_date', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createSale = async (sale) => {
  const { data, error } = await supabase
    .from('sales')
    .insert([sale])
    .select();
  
  if (error) throw error;
  return data[0];
};

// Analytics operations
export const getTotalRevenue = async (startDate, endDate) => {
  let query = supabase
    .from('sales')
    .select('total_amount');

  if (startDate && endDate) {
    query = query
      .gte('sale_date', startDate)
      .lte('sale_date', endDate);
  }

  const { data, error } = await query;
  
  if (error) throw error;
  
  return data.reduce((sum, sale) => sum + (sale.total_amount || 0), 0);
};

export const getTopProducts = async (startDate, endDate, limit = 5) => {
  let query = supabase
    .from('sales')
    .select(`
      product_id,
      quantity,
      total_amount,
      products(name, category)
    `);

  if (startDate && endDate) {
    query = query
      .gte('sale_date', startDate)
      .lte('sale_date', endDate);
  }

  const { data, error } = await query;
  
  if (error) throw error;

  // Aggregate by product
  const productMap = {};
  data.forEach(sale => {
    const productId = sale.product_id;
    if (!productMap[productId]) {
      productMap[productId] = {
        product_id: productId,
        name: sale.products?.name || 'Unknown',
        category: sale.products?.category || 'Unknown',
        total_quantity: 0,
        total_revenue: 0
      };
    }
    productMap[productId].total_quantity += sale.quantity || 0;
    productMap[productId].total_revenue += sale.total_amount || 0;
  });

  return Object.values(productMap)
    .sort((a, b) => b.total_revenue - a.total_revenue)
    .slice(0, limit);
};

export const getRegionStats = async (startDate, endDate) => {
  let query = supabase
    .from('sales')
    .select(`
      total_amount,
      customers(region)
    `);

  if (startDate && endDate) {
    query = query
      .gte('sale_date', startDate)
      .lte('sale_date', endDate);
  }

  const { data, error } = await query;
  
  if (error) throw error;

  // Aggregate by region
  const regionMap = {};
  data.forEach(sale => {
    const region = sale.customers?.region || 'Unknown';
    if (!regionMap[region]) {
      regionMap[region] = {
        region,
        total_revenue: 0,
        total_sales: 0
      };
    }
    regionMap[region].total_revenue += sale.total_amount || 0;
    regionMap[region].total_sales += 1;
  });

  return Object.values(regionMap);
};

export const getRevenueByDate = async (startDate, endDate) => {
  let query = supabase
    .from('sales')
    .select('sale_date, total_amount');

  if (startDate && endDate) {
    query = query
      .gte('sale_date', startDate)
      .lte('sale_date', endDate);
  }

  const { data, error } = await query.order('sale_date', { ascending: true });
  
  if (error) throw error;

  // Group by date
  const dateMap = {};
  data.forEach(sale => {
    const date = sale.sale_date.split('T')[0]; // Get date part only
    if (!dateMap[date]) {
      dateMap[date] = {
        date,
        revenue: 0,
        sales_count: 0
      };
    }
    dateMap[date].revenue += sale.total_amount || 0;
    dateMap[date].sales_count += 1;
  });

  return Object.values(dateMap);
};