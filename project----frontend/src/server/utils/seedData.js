import { supabase } from '../config/supabase.js';

const regions = ['North', 'South', 'East', 'West', 'Central'];
const customerTypes = ['Individual', 'Business', 'Enterprise'];
const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Automotive'];

// Generate random data
const generateCustomers = (count = 50) => {
  const customers = [];
  for (let i = 1; i <= count; i++) {
    customers.push({
      name: `Customer ${i}`,
      email: `customer${i}@example.com`,
      region: regions[Math.floor(Math.random() * regions.length)],
      type: customerTypes[Math.floor(Math.random() * customerTypes.length)]
    });
  }
  return customers;
};

const generateProducts = (count = 30) => {
  const products = [];
  for (let i = 1; i <= count; i++) {
    products.push({
      name: `Product ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: Math.floor(Math.random() * 500) + 20,
      description: `Description for Product ${i}`
    });
  }
  return products;
};

const generateSales = (customerIds, productIds, count = 500) => {
  const sales = [];
  const startDate = new Date('2022-01-01');
  const endDate = new Date('2024-12-31');
  
  for (let i = 0; i < count; i++) {
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    const customerId = customerIds[Math.floor(Math.random() * customerIds.length)];
    const productId = productIds[Math.floor(Math.random() * productIds.length)];
    const quantity = Math.floor(Math.random() * 10) + 1;
    const unitPrice = Math.floor(Math.random() * 500) + 20;
    
    sales.push({
      customer_id: customerId,
      product_id: productId,
      quantity,
      unit_price: unitPrice,
      total_amount: quantity * unitPrice,
      sale_date: randomDate.toISOString().split('T')[0]
    });
  }
  return sales;
};

export const seedDatabase = async () => {
  try {
    // Skip seeding if using demo configuration
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url') {
      console.log('Skipping database seeding - using demo configuration. Connect to Supabase to enable full functionality.');
      return;
    }

    // Check if data already exists
    const { data: existingCustomers } = await supabase
      .from('customers')
      .select('id')
      .limit(1);

    if (existingCustomers && existingCustomers.length > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }

    console.log('Seeding database...');

    // Create customers
    const customers = generateCustomers();
    const { data: insertedCustomers, error: customersError } = await supabase
      .from('customers')
      .insert(customers)
      .select('id');

    if (customersError) {
      console.error('Error seeding customers:', customersError);
      return;
    }

    // Create products
    const products = generateProducts();
    const { data: insertedProducts, error: productsError } = await supabase
      .from('products')
      .insert(products)
      .select('id');

    if (productsError) {
      console.error('Error seeding products:', productsError);
      return;
    }

    // Create sales
    const customerIds = insertedCustomers.map(c => c.id);
    const productIds = insertedProducts.map(p => p.id);
    const sales = generateSales(customerIds, productIds);

    const { error: salesError } = await supabase
      .from('sales')
      .insert(sales);

    if (salesError) {
      console.error('Error seeding sales:', salesError);
      return;
    }

    console.log('Database seeded successfully with:', {
      customers: customers.length,
      products: products.length,
      sales: sales.length
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  }
};