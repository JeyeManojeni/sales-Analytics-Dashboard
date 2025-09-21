const API_BASE_URL = 'http://localhost:3001/api';

export const fetchAnalytics = async (startDate: string, endDate: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/analytics/dashboard?startDate=${startDate}&endDate=${endDate}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

export const fetchRevenue = async (startDate: string, endDate: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/analytics/revenue?startDate=${startDate}&endDate=${endDate}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching revenue:', error);
    throw error;
  }
};

export const fetchTopProducts = async (startDate: string, endDate: string, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/analytics/products/top?startDate=${startDate}&endDate=${endDate}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching top products:', error);
    throw error;
  }
};

export const fetchRegionalStats = async (startDate: string, endDate: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/analytics/regions?startDate=${startDate}&endDate=${endDate}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching regional stats:', error);
    throw error;
  }
};

export const fetchSales = async (startDate: string, endDate: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/analytics/sales?startDate=${startDate}&endDate=${endDate}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
};