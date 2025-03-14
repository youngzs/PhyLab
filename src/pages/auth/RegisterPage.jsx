import React from 'react';
import Navbar from '../../components/common/Navbar';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar title="注册" hideUserSection={true} />
      <main className="container mx-auto px-4 py-16">
        <RegisterForm />
      </main>
    </div>
  );
};

export default RegisterPage; 