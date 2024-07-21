export const fetchExpenses = async (page: number, limit: number = 10) => {
    const response = await fetch(`/api/expenses?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }
    const data = await response.json();
    return data;
  };