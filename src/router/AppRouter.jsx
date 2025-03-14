import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 页面组件
import HomePage from '../pages/home/HomePage';
import NewtonLaws from '../pages/learn/mechanics/NewtonLaws';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import QuizPage from '../pages/quiz/QuizPage';
import LearningReport from '../pages/dashboard/LearningReport';
import Dashboard from '../pages/dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* 受保护的路由 */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/dashboard/report" element={<PrivateRoute><LearningReport /></PrivateRoute>} />
        <Route path="/learn/mechanics/newton-laws" element={<PrivateRoute><NewtonLaws /></PrivateRoute>} />
        <Route path="/quiz/:quizId" element={<PrivateRoute><QuizPage /></PrivateRoute>} />
        
        {/* 404路由 */}
        <Route path="*" element={<div>页面不存在</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter; 