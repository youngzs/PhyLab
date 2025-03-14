import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../store/UserContext';
import Button from '../common/Button';
import Card from '../common/Card';
import Icon from '../common/Icon';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await login(credentials);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || '登录失败，请检查您的凭据');
      }
    } catch (err) {
      setError('登录过程中发生错误，请稍后再试');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <Icon name="atom" size="3xl" color="blue-600 dark:text-blue-400" className="mb-2" />
        <h2 className="text-2xl font-bold">登录您的账号</h2>
        <p className="text-gray-600 dark:text-gray-400">继续您的物理学习之旅</p>
      </div>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-lg mb-4">
          <Icon name="exclamation-circle" className="mr-2" />
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
            邮箱地址
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none bg-white dark:bg-gray-800"
            placeholder="请输入您的邮箱"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
            密码
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none bg-white dark:bg-gray-800"
            placeholder="请输入您的密码"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <div className="text-right mt-1">
            <a href="/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              忘记密码?
            </a>
          </div>
        </div>
        
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full" 
          disabled={loading}
        >
          {loading ? (
            <>
              <Icon name="spinner" className="animate-spin mr-2" />
              登录中...
            </>
          ) : '登录'}
        </Button>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            还没有账号? <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">立即注册</a>
          </p>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm; 