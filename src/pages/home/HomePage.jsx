import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Card from '../../components/common/Card';
import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';

const HomePage = () => {
  // 模拟用户数据
  const user = {
    name: '张三',
    progress: {
      mechanics: 35,
      electricity: 10,
      optics: 0
    }
  };
  
  // 推荐学习内容
  const recommendedContent = [
    {
      id: 'newton-laws',
      title: '牛顿运动定律与重力',
      description: '学习运动的基本规律，理解力、加速度和质量的关系',
      icon: 'apple-alt',
      progress: 35,
      path: '/learn/mechanics/newton-laws'
    },
    {
      id: 'energy',
      title: '能量与功',
      description: '探索能量转换和守恒，解决与功和能相关的物理问题',
      icon: 'bolt',
      progress: 0,
      path: '/learn/mechanics/energy'
    },
    {
      id: 'electricity',
      title: '电路基础',
      description: '了解电流、电压和电阻的关系，分析简单电路',
      icon: 'plug',
      progress: 10,
      path: '/learn/electricity/circuits'
    }
  ];
  
  // 学习进度数据
  const learningProgress = [
    { category: '力学', progress: 35, color: 'blue' },
    { category: '电学', progress: 10, color: 'purple' },
    { category: '光学', progress: 0, color: 'pink' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar title="物理思维实验室" user={user} />
      
      <main className="container mx-auto px-4 py-8 animation-fade">
        {/* 欢迎区域 */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">欢迎回来，{user?.name || '同学'}</h1>
            <p className="text-lg mb-6">继续你的物理学习之旅，探索运动与力的奥秘</p>
            <Link to="/learn/mechanics/newton-laws">
              <Button variant="primary" size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                继续学习 <Icon name="arrow-right" className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
        
        {/* 学习进度 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Icon name="chart-line" className="mr-3 text-blue-600 dark:text-blue-400" />
            学习进度
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {learningProgress.map((item) => (
              <Card key={item.category} className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{item.category}</h3>
                  <span className="text-sm font-medium">{item.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div 
                    className={`h-full rounded-full bg-${item.color}-600 dark:bg-${item.color}-500`}
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </Card>
            ))}
          </div>
        </section>
        
        {/* 推荐学习内容 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Icon name="lightbulb" className="mr-3 text-yellow-500" />
            推荐学习内容
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedContent.map((content) => (
              <Link key={content.id} to={content.path}>
                <Card className="h-full p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                      <Icon name={content.icon} size="lg" color="blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold">{content.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{content.description}</p>
                  {content.progress > 0 ? (
                    <>
                      <div className="flex justify-between text-sm mb-1">
                        <span>学习进度</span>
                        <span>{content.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div 
                          className="h-full rounded-full bg-green-500" 
                          style={{ width: `${content.progress}%` }}
                        ></div>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-gray-500 dark:text-gray-400 italic">尚未开始学习</div>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </section>
        
        {/* 最近活动 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Icon name="history" className="mr-3 text-purple-600 dark:text-purple-400" />
            最近活动
          </h2>
          <Card>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3 flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
                  <Icon name="check-circle" color="green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">完成了「牛顿第一定律」测验</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">得分: 80分</p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">2小时前</div>
              </li>
              <li className="py-3 flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                  <Icon name="flask" color="blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">完成了「自由落体运动」实验</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">3次实验记录</p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">昨天</div>
              </li>
              <li className="py-3 flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
                  <Icon name="book" color="purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">开始学习「牛顿运动定律与重力」</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">章节进度: 35%</p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">3天前</div>
              </li>
            </ul>
          </Card>
        </section>
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Icon name="atom" size="2xl" color="blue-600 dark:text-blue-400" className="mr-3" />
              <div>
                <h3 className="font-bold text-lg">物理思维实验室</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">让物理学习更直观、更有趣</p>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 物理思维实验室. 保留所有权利.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 