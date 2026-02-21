import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FinanceProvider } from './context/FinanceContext';
import Header from './components/Header';
import Summary from './components/Summary';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import CategoryChart from './components/CategoryChart';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

// Componente para proteger rutas privadas
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

// Componente que contiene la estructura principal de la app
function AppContent() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <FinanceProvider>
                <Summary />
                <AddTransaction />
                <TransactionList />
                <CategoryChart />
              </FinanceProvider>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;