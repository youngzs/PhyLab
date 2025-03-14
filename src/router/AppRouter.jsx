import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 页面组件
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import Dashboard from '../pages/dashboard/Dashboard';
import LearningReport from '../pages/dashboard/LearningReport';

// 力学页面
import MechanicsHomePage from '../pages/learn/mechanics/MechanicsHomePage';
import NewtonLaws from '../pages/learn/mechanics/NewtonLaws';
import MomentumAndCollisions from '../pages/learn/mechanics/MomentumAndCollisions';

// 电学和光学页面
import ElectricityHomePage from '../pages/learn/electricity/ElectricityHomePage';
import OpticsHomePage from '../pages/learn/optics/OpticsHomePage';

// 测验页面
import QuizPage from '../pages/quiz/QuizPage';

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
        
        {/* 力学路由 */}
        <Route path="/learn/mechanics" element={<PrivateRoute><MechanicsHomePage /></PrivateRoute>} />
        <Route path="/learn/mechanics/newton-laws" element={<PrivateRoute><NewtonLaws /></PrivateRoute>} />
        <Route path="/learn/mechanics/momentum" element={<PrivateRoute><MomentumAndCollisions /></PrivateRoute>} />
        
        {/* 电学和光学路由 */}
        <Route path="/learn/electricity" element={<PrivateRoute><ElectricityHomePage /></PrivateRoute>} />
        <Route path="/learn/optics" element={<PrivateRoute><OpticsHomePage /></PrivateRoute>} />
        
        {/* 测验路由 */}
        <Route path="/quiz/:quizId" element={<PrivateRoute><QuizPage /></PrivateRoute>} />
        
        {/* 404路由 */}
        <Route path="*" element={<div>页面不存在</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter; 