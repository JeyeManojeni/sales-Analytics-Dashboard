import express from 'express';
import { 
  getTotalRevenue, 
  getTopProducts, 
  getRegionStats, 
  getRevenueByDate,
  getSales 
} from '../models/database.js';
import { io } from '../index.js';

const router = express.Router();

// Get comprehensive analytics
router.get('/dashboard', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const [
      totalRevenue,
      topProducts,
      regionStats,
      revenueByDate,
      recentSales
    ] = await Promise.all([
      getTotalRevenue(startDate, endDate),
      getTopProducts(startDate, endDate),
      getRegionStats(startDate, endDate),
      getRevenueByDate(startDate, endDate),
      getSales(startDate, endDate)
    ]);

    const analytics = {
      totalRevenue,
      totalSales: recentSales.length,
      averageOrderValue: recentSales.length > 0 ? totalRevenue / recentSales.length : 0,
      topProducts,
      regionStats,
      revenueByDate: revenueByDate.slice(-30), // Last 30 days
      recentSales: recentSales.slice(0, 10) // Latest 10 sales
    };

    res.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

// Get revenue data
router.get('/revenue', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    const totalRevenue = await getTotalRevenue(startDate, endDate);
    const revenueByDate = await getRevenueByDate(startDate, endDate);

    res.json({
      totalRevenue,
      revenueByDate
    });
  } catch (error) {
    console.error('Error fetching revenue:', error);
    res.status(500).json({ error: 'Failed to fetch revenue data' });
  }
});

// Get top products
router.get('/products/top', async (req, res) => {
  try {
    const { startDate, endDate, limit = 10 } = req.query;
    const topProducts = await getTopProducts(startDate, endDate, parseInt(limit));
    
    res.json(topProducts);
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({ error: 'Failed to fetch top products data' });
  }
});

// Get regional statistics
router.get('/regions', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const regionStats = await getRegionStats(startDate, endDate);
    
    res.json(regionStats);
  } catch (error) {
    console.error('Error fetching region stats:', error);
    res.status(500).json({ error: 'Failed to fetch regional statistics' });
  }
});

// Get sales data
router.get('/sales', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const sales = await getSales(startDate, endDate);
    
    res.json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Failed to fetch sales data' });
  }
});

export default router;