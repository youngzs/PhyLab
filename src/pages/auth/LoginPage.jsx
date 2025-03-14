import React from 'react';
import Navbar from '../../components/common/Navbar';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar title="登录" hideUserSection={true} />
      <main className="container mx-auto px-4 py-16">
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage; 