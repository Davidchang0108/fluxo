import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useFinance } from '../context/FinanceContext';
import { FiPieChart } from 'react-icons/fi';

// Registra los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart() {
  const { transactions } = useFinance();

  const chartData = useMemo(() => {
    const expensesByCategory = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
      });

    const labels = Object.keys(expensesByCategory);
    const values = Object.values(expensesByCategory);

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: ['#4361ee', '#06d6a0', '#ffd166', '#ef476f', '#fb8b24', '#9c89b8', '#5e548e'],
          borderWidth: 1,
        },
      ],
    };
  }, [transactions]);

  // No mostrar nada si no hay gastos
  if (chartData.labels.length === 0) {
    return null;
  }

  return (
    <div className="chart-container">
      <h2><FiPieChart /> Gastos por categoría</h2>
      <Pie data={chartData} />
    </div>
  );
}