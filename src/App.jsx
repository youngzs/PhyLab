import React from 'react';
import AppRouter from './router/AppRouter';
import { UserProvider } from './store/UserContext';
import './styles/variables.css';

const App = () => {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <AppRouter />
      </div>
    </UserProvider>
  );
};

export default App; 