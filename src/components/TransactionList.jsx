import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { FiTrash2, FiBriefcase, FiCoffee, FiTruck, FiFilm, FiHeart, FiMoreHorizontal } from 'react-icons/fi';

// Mapeo de categorías a iconos (puedes ampliarlo)
const categoryIcon = {
  'Trabajo fijo': <FiBriefcase />,
  'Trabajo extra': <FiBriefcase />,
  'Comida': <FiCoffee />,
  'Transporte': <FiTruck />,
  'Ocio': <FiFilm />,
  'Salud': <FiHeart />,
  'Otros': <FiMoreHorizontal />,
};

export default function TransactionList() {
  const { transactions, deleteTransaction } = useFinance();

  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="transaction-list">
      <h2>Historial de movimientos</h2>
      {sorted.length === 0 ? (
        <p>No hay transacciones aún. ¡Añade una!</p>
      ) : (
        <ul>
          {sorted.map(t => (
            <li key={t.id} className={t.type}>
              <div className="transaction-icon">
                {categoryIcon[t.category] || <FiMoreHorizontal />}
              </div>
              <div className="transaction-details">
                <span className="transaction-category">{t.category}</span>
                {t.description && <span className="transaction-description">{t.description}</span>}
                <span className="transaction-date">{t.date}</span>
                <span className={`transaction-amount ${t.type}`}>
                  {t.type === 'income' ? '+' : '-'} ${t.amount.toFixed(2)}
                </span>
              </div>
              <button className="delete-btn" onClick={() => deleteTransaction(t.id)}>
                <FiTrash2 />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}