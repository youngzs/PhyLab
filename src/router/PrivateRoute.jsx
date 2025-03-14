import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../store/UserContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();
  
  if (loading) {
    // 加载中显示
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }
  
  if (!user) {
    // 未登录重定向到登录页面，并记录当前尝试访问的路径
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  return children;
};

export default PrivateRoute; 