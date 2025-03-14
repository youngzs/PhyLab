import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import Card from '../../../components/common/Card';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';

const MomentumAndCollisions = () => {
  const [activeTab, setActiveTab] = useState('learn');
  
  const tabs = [
    { id: 'learn', label: '学习内容', icon: 'book' },
    { id: 'experiment', label: '实验模拟', icon: 'flask' },
    { id: 'exercises', label: '练习题', icon: 'tasks' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar title="动量与碰撞" backLink="/learn/mechanics" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 标题区域 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">动量与碰撞</h1>
            <p className="text-gray-600 dark:text-gray-400">
              探索物体碰撞过程中的动量守恒规律，以及在日常生活中的应用。
            </p>
          </div>
          
          {/* 标签页导航 */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`
                  flex items-center py-4 px-6 border-b-2 font-medium text-sm leading-5 transition-colors
                  ${activeTab === tab.id 
                    ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}
                `}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon name={tab.icon} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* 学习内容标签页 */}
          <div className={`tab-content ${activeTab === 'learn' ? 'active' : ''}`}>
            <div className="prose dark:prose-invert max-w-none mb-8">
              <h2>动量的概念</h2>
              <p>
                动量是物理学中描述物体运动状态的一个重要物理量，它是物体质量与速度的乘积。
                对于质量为m，速度为v的物体，其动量p定义为：
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                <p className="text-xl">p = mv</p>
              </div>
              <p>
                动量是一个矢量，它的方向与速度的方向相同。动量的单位是kg·m/s。
              </p>
              
              <h2>动量守恒定律</h2>
              <p>
                动量守恒定律是自然界最基本的守恒定律之一，它指出：在没有外力作用的系统中，
                系统的总动量保持不变。这一规律在碰撞、爆炸等过程中得到充分应用。
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                <p className="text-xl">p<sub>初</sub> = p<sub>末</sub></p>
                <p className="text-xl">m<sub>1</sub>v<sub>1初</sub> + m<sub>2</sub>v<sub>2初</sub> = m<sub>1</sub>v<sub>1末</sub> + m<sub>2</sub>v<sub>2末</sub></p>
              </div>
              
              <h2>碰撞类型</h2>
              <p>碰撞可以分为两类：</p>
              <ul>
                <li>
                  <strong>弹性碰撞</strong>：在碰撞过程中，动量和机械能都保持守恒。例如理想化的小球碰撞。
                </li>
                <li>
                  <strong>非弹性碰撞</strong>：在碰撞过程中，动量守恒，但机械能不守恒，部分动能转化为内能。
                  极限情况是完全非弹性碰撞，碰撞后物体粘在一起运动。
                </li>
              </ul>
              
              <h2>日常应用</h2>
              <p>
                动量守恒定律在日常生活中有很多应用：
              </p>
              <ul>
                <li>火箭和喷气式飞机的推进原理</li>
                <li>撞球游戏中的球的运动</li>
                <li>汽车安全设计（安全气囊和缓冲区）</li>
                <li>枪械的后坐力</li>
              </ul>
            </div>
            
            <div className="flex justify-between items-center mt-8">
              <Button 
                as={Link} 
                to="/learn/mechanics/newton-laws"
                variant="outline"
              >
                <Icon name="arrow-left" className="mr-2" />
                上一课：牛顿运动定律
              </Button>
              
              <Button
                onClick={() => setActiveTab('experiment')}
                variant="primary"
              >
                实验模拟
                <Icon name="arrow-right" className="ml-2" />
              </Button>
            </div>
          </div>
          
          {/* 实验模拟标签页 */}
          <div className={`tab-content ${activeTab === 'experiment' ? 'active' : ''}`}>
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">碰撞模拟实验</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                通过交互式实验模拟，探索不同质量和速度的小球在碰撞过程中动量守恒定律的应用。
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="flask" size="3xl" color="blue-600 dark:text-blue-400" className="mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    实验模拟正在加载中...
                  </p>
                  <Button 
                    className="mt-4"
                    variant="primary"
                    disabled
                  >
                    <Icon name="play" className="mr-2" />
                    开始实验
                  </Button>
                </div>
              </div>
            </Card>
            
            <div className="flex justify-between items-center mt-8">
              <Button 
                onClick={() => setActiveTab('learn')}
                variant="outline"
              >
                <Icon name="arrow-left" className="mr-2" />
                返回学习内容
              </Button>
              
              <Button
                onClick={() => setActiveTab('exercises')}
                variant="primary"
              >
                练习题
                <Icon name="arrow-right" className="ml-2" />
              </Button>
            </div>
          </div>
          
          {/* 练习题标签页 */}
          <div className={`tab-content ${activeTab === 'exercises' ? 'active' : ''}`}>
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">巩固练习</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                完成以下练习题，测试您对动量与碰撞概念的理解。
              </p>
              
              <Link 
                to="/quiz/momentum-basics"
                className="block bg-gray-100 dark:bg-gray-800 rounded-lg p-6 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-lg mb-2">动量基础知识测验</h3>
                    <p className="text-gray-600 dark:text-gray-400">10道题 · 约15分钟</p>
                  </div>
                  <Icon name="chevron-right" size="lg" color="blue-600 dark:text-blue-400" />
                </div>
              </Link>
            </Card>
            
            <div className="flex justify-between items-center mt-8">
              <Button 
                onClick={() => setActiveTab('experiment')}
                variant="outline"
              >
                <Icon name="arrow-left" className="mr-2" />
                返回实验模拟
              </Button>
              
              <Button
                as={Link}
                to="/learn/mechanics/circular-motion"
                variant="primary"
                disabled
              >
                下一课：圆周运动
                <Icon name="arrow-right" className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MomentumAndCollisions; 