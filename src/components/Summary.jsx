import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { FiArrowUpCircle, FiArrowDownCircle, FiDollarSign } from 'react-icons/fi';

export default function Summary() {
  const { transactions } = useFinance();

  const totals = useMemo(() => {
    let income = 0, expense = 0;
    transactions.forEach(t => {
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;
    });
    return { income, expense, balance: income - expense };
  }, [transactions]);

  return (
    <div className="summary">
      <div className="card income">
        <h3><FiArrowUpCircle /> Ingresos</h3>
        <p>${totals.income.toFixed(2)}</p>
      </div>
      <div className="card expense">
        <h3><FiArrowDownCircle /> Gastos</h3>
        <p>${totals.expense.toFixed(2)}</p>
      </div>
      <div className="card balance">
        <h3><FiDollarSign /> Balance</h3>
        <p className={totals.balance >= 0 ? 'positive' : 'negative'}>
          ${totals.balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}