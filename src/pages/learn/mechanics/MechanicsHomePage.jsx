import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import Card from '../../../components/common/Card';
import Icon from '../../../components/common/Icon';

const MechanicsHomePage = () => {
  const topics = [
    {
      id: 'newton-laws',
      title: '牛顿运动定律',
      description: '学习物体运动的基本规律',
      icon: 'apple-alt',
      status: 'available',
      path: '/learn/mechanics/newton-laws'
    },
    {
      id: 'momentum',
      title: '动量与碰撞',
      description: '探索物体碰撞与动量守恒',
      icon: 'arrows-alt-h',
      status: 'available',
      path: '/learn/mechanics/momentum'
    },
    {
      id: 'circular-motion',
      title: '圆周运动',
      description: '研究物体在圆形轨道上的运动',
      icon: 'circle-notch',
      status: 'coming-soon',
      path: '/learn/mechanics/circular-motion'
    },
    {
      id: 'energy',
      title: '能量与功',
      description: '理解能量转换与守恒',
      icon: 'bolt',
      status: 'coming-soon',
      path: '/learn/mechanics/energy'
    },
    {
      id: 'oscillation',
      title: '振动与波',
      description: '掌握振动系统的基本规律',
      icon: 'wave-square',
      status: 'coming-soon',
      path: '/learn/mechanics/oscillation'
    },
    {
      id: 'gravity',
      title: '万有引力',
      description: '了解宇宙中的引力作用',
      icon: 'globe',
      status: 'coming-soon',
      path: '/learn/mechanics/gravity'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar title="力学" backLink="/learn" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">力学</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            力学是物理学的基础分支，研究物体的运动和影响运动的因素。
            通过学习力学，您将理解从日常生活到宇宙尺度的各种物理现象。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map(topic => (
            <Link 
              key={topic.id}
              to={topic.status === 'available' ? topic.path : '#'}
              className={`
                block transition-transform hover:scale-105
                ${topic.status !== 'available' ? 'cursor-not-allowed opacity-70' : ''}
              `}
              onClick={e => {
                if (topic.status !== 'available') {
                  e.preventDefault();
                }
              }}
            >
              <Card className="h-full flex flex-col p-0 overflow-hidden">
                <div className="p-6 flex-grow">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                      <Icon name={topic.icon} color="blue-600 dark:text-blue-400" size="lg" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        {topic.title}
                        {topic.status === 'coming-soon' && (
                          <span className="ml-2 text-xs py-1 px-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full">
                            即将推出
                          </span>
                        )}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">{topic.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {topic.status === 'available' ? '开始学习' : '敬请期待'}
                    </span>
                    <Icon name="arrow-right" color="blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MechanicsHomePage; 