import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }

  return (
    <div className="header">
      <h1>fluxo</h1>
      {currentUser && (
        <div className="user-info">
          <span>{currentUser.email}</span>
          <button onClick={handleLogout} className="logout-btn">
            <FiLogOut /> Salir
          </button>
        </div>
      )}
    </div>
  );
}