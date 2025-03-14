import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Card from '../../components/common/Card';
import Icon from '../../components/common/Icon';

const LearnHomePage = () => {
  const subjects = [
    {
      id: 'mechanics',
      title: '力学',
      description: '物体运动的规律与力的作用',
      icon: 'atom',
      status: 'available',
      progress: 35,
      path: '/learn/mechanics'
    },
    {
      id: 'electricity',
      title: '电学',
      description: '电荷、电场、电路的基本原理',
      icon: 'bolt',
      status: 'available',
      progress: 10,
      path: '/learn/electricity'
    },
    {
      id: 'optics',
      title: '光学',
      description: '光的传播、反射、折射与干涉',
      icon: 'lightbulb',
      status: 'available',
      progress: 0,
      path: '/learn/optics'
    },
    {
      id: 'thermodynamics',
      title: '热学',
      description: '热量、温度与热力学定律',
      icon: 'temperature-high',
      status: 'coming-soon',
      progress: 0,
      path: '/learn/thermodynamics'
    },
    {
      id: 'quantum',
      title: '量子物理',
      description: '微观世界的奇妙规律',
      icon: 'atom',
      status: 'coming-soon',
      progress: 0,
      path: '/learn/quantum'
    },
    {
      id: 'relativity',
      title: '相对论',
      description: '时空与引力的现代理论',
      icon: 'rocket',
      status: 'coming-soon',
      progress: 0,
      path: '/learn/relativity'
    }
  ];
  
  // 最近学习的内容
  const recentLessons = [
    {
      id: 1,
      title: '牛顿运动定律',
      subject: '力学',
      lastAccessed: '昨天',
      progress: 75,
      path: '/learn/mechanics/newton-laws'
    },
    {
      id: 2,
      title: '电荷与库仑定律',
      subject: '电学',
      lastAccessed: '3天前',
      progress: 30,
      path: '/learn/electricity/charges'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar title="学习中心" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">探索物理世界</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            从基础力学到量子物理，系统学习物理学的各个分支，提升您的科学素养和解决问题的能力。
          </p>
        </div>
        
        {/* 继续学习卡片 */}
        {recentLessons.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">继续学习</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentLessons.map(lesson => (
                <Link key={lesson.id} to={lesson.path}>
                  <Card className="h-full hover:shadow-md transition-all">
                    <div className="p-6">
                      <div className="flex items-start">
                        <div className="flex-grow">
                          <h3 className="font-semibold text-lg mb-1">{lesson.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {lesson.subject} · 最近访问: {lesson.lastAccessed}
                          </p>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                            <div 
                              className="h-full bg-blue-600 dark:bg-blue-400"
                              style={{ width: `${lesson.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                            {lesson.progress}% 完成
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* 学科列表 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">学科分类</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map(subject => (
              <Link 
                key={subject.id}
                to={subject.status === 'available' ? subject.path : '#'}
                className={`
                  block transition-transform hover:scale-105
                  ${subject.status !== 'available' ? 'cursor-not-allowed opacity-70' : ''}
                `}
                onClick={e => {
                  if (subject.status !== 'available') {
                    e.preventDefault();
                  }
                }}
              >
                <Card className="h-full flex flex-col p-0 overflow-hidden">
                  <div className="p-6 flex-grow">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                        <Icon name={subject.icon} color="blue-600 dark:text-blue-400" size="lg" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold mb-2">
                          {subject.title}
                          {subject.status === 'coming-soon' && (
                            <span className="ml-2 text-xs py-1 px-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full">
                              即将推出
                            </span>
                          )}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">{subject.description}</p>
                      </div>
                    </div>
                    
                    {subject.progress > 0 && (
                      <div className="mt-4">
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-1">
                          <div 
                            className="h-full bg-blue-600 dark:bg-blue-400"
                            style={{ width: `${subject.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-right text-xs text-gray-600 dark:text-gray-400">
                          {subject.progress}% 完成
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-auto border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {subject.status === 'available' ? '开始学习' : '敬请期待'}
                      </span>
                      <Icon name="arrow-right" color="blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearnHomePage; 