import React from 'react';
import Navbar from '../../../components/common/Navbar';
import UnderConstruction from '../../../components/common/UnderConstruction';

const ElectricityHomePage = () => {
  const suggestedLinks = [
    {
      title: '牛顿运动定律',
      description: '先学习力学基础',
      to: '/learn/mechanics/newton-laws',
      icon: 'apple-alt'
    },
    {
      title: '力学主页',
      description: '探索力学的其他主题',
      to: '/learn/mechanics',
      icon: 'atom'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar title="电学" backLink="/learn" />
      
      <main className="container mx-auto px-4 py-8">
        <UnderConstruction 
          title="电学课程正在开发中" 
          description="我们正在精心设计电学课程内容，包括电荷、电场、电流、电路等主题，敬请期待！"
          suggestedLinks={suggestedLinks}
          icon="bolt"
          returnPath="/learn"
        />
      </main>
    </div>
  );
};

export default ElectricityHomePage; 