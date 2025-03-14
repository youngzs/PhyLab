import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Card from '../common/Card';
import Icon from '../common/Icon';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    grade: '',
    school: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // 这里应该调用API进行注册
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('注册信息:', formData);
      navigate('/login', { state: { message: '注册成功，请登录' } });
    } catch (err) {
      setError('注册过程中发生错误，请稍后再试');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // 年级选项
  const gradeOptions = [
    { value: '', label: '请选择年级' },
    { value: 'g7', label: '初一' },
    { value: 'g8', label: '初二' },
    { value: 'g9', label: '初三' },
    { value: 'g10', label: '高一' },
    { value: 'g11', label: '高二' },
    { value: 'g12', label: '高三' }
  ];
  
  return (
    <Card className="max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <Icon name="user-plus" size="2xl" color="blue-600 dark:text-blue-400" className="mb-2" />
        <h2 className="text-2xl font-bold">创建新账号</h2>
        <p className="text-gray-600 dark:text-gray-400">开始您的物理学习之旅</p>
      </div>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-lg mb-4">
          <Icon name="exclamation-circle" className="mr-2" />
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
            姓名
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none bg-white dark:bg-gray-800"
            placeholder="请输入您的姓名"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
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
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
              密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none bg-white dark:bg-gray-800"
              placeholder="请设置密码"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="confirmPassword">
              确认密码
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none bg-white dark:bg-gray-800"
              placeholder="请再次输入密码"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="grade">
              年级
            </label>
            <select
              id="grade"
              name="grade"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none bg-white dark:bg-gray-800"
              value={formData.grade}
              onChange={handleChange}
              required
            >
              {gradeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="school">
              学校（可选）
            </label>
            <input
              id="school"
              name="school"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none bg-white dark:bg-gray-800"
              placeholder="请输入您的学校"
              value={formData.school}
              onChange={handleChange}
            />
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
              注册中...
            </>
          ) : '注册'}
        </Button>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            已有账号? <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">立即登录</a>
          </p>
        </div>
      </form>
    </Card>
  );
};

export default RegisterForm; 