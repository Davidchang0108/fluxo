import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

const categories = ['Trabajo fijo', 'Trabajo extra', 'Comida', 'Transporte', 'Ocio', 'Salud', 'Otros'];

export default function AddTransaction() {
  const { addTransaction } = useFinance();
  const [form, setForm] = useState({
    type: 'expense',
    category: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    description: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.category) return;

    const newTransaction = {
      id: crypto.randomUUID(),
      ...form,
      amount: parseFloat(form.amount),
    };
    addTransaction(newTransaction);
    // Resetear formulario (manteniendo tipo y fecha por defecto)
    setForm({
      type: 'expense',
      category: '',
      amount: '',
      date: new Date().toISOString().slice(0, 10),
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="income">Ingreso</option>
        <option value="expense">Gasto</option>
      </select>

      <select name="category" value={form.category} onChange={handleChange} required>
        <option value="">Categoría</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="number"
        name="amount"
        placeholder="Monto"
        value={form.amount}
        onChange={handleChange}
        required
        min="0"
        step="0.01"
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Descripción (opcional)"
        value={form.description}
        onChange={handleChange}
      />

      <button type="submit">Añadir</button>
    </form>
  );
}