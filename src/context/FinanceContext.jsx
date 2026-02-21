import React, { useReducer, createContext, useContext, useEffect, useState } from 'react';
import { db } from '../src/firebase';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const FinanceContext = createContext();

function financeReducer(state, action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { transactions: action.payload };
    case 'ADD_TRANSACTION':
      return { transactions: [action.payload, ...state.transactions] };
    case 'DELETE_TRANSACTION':
      return { transactions: state.transactions.filter(t => t.id !== action.payload) };
    default:
      return state;
  }
}

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(financeReducer, { transactions: [] });
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Escuchar cambios en Firestore cuando el usuario está autenticado
  useEffect(() => {
    if (!currentUser) {
      dispatch({ type: 'SET_TRANSACTIONS', payload: [] });
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'transactions'), where('userId', '==', currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Ordenar por fecha descendente (más reciente primero)
      transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      dispatch({ type: 'SET_TRANSACTIONS', payload: transactions });
      setLoading(false);
    }, (error) => {
      console.error('Error al cargar transacciones:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  // Añadir transacción
  const addTransaction = async (transaction) => {
    if (!currentUser) return;
    try {
      await addDoc(collection(db, 'transactions'), {
        ...transaction,
        userId: currentUser.uid,
        amount: Number(transaction.amount) // asegurar que es número
      });
    } catch (error) {
      console.error('Error al añadir transacción:', error);
    }
  };

  // Eliminar transacción
  const deleteTransaction = async (id) => {
    if (!currentUser) return;
    try {
      await deleteDoc(doc(db, 'transactions', id));
    } catch (error) {
      console.error('Error al eliminar transacción:', error);
    }
  };

  return (
    <FinanceContext.Provider value={{
      transactions: state.transactions,
      addTransaction,
      deleteTransaction,
      loading
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance debe usarse dentro de FinanceProvider');
  }
  return context;
}