import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Card from '../../components/common/Card';
import Icon from '../../components/common/Icon';
import LearningProgress from '../../components/dashboard/LearningProgress';
import { useUser } from '../../store/UserContext';

const Dashboard = () => {
  const { user } = useUser();
  const [progressData, setProgressData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 模拟API调用
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 模拟学习进度数据
      setProgressData([
        { 
          id: 'mechanics', 
          title: '力学', 
          progress: 35, 
          weight: 0.3,
          category: 'mechanics',
          icon: 'atom'
        },
        { 
          id: 'electricity', 
          title: '电学', 
          progress: 10, 
          weight: 0.3,
          category: 'electricity',
          icon: 'bolt'
        },
        { 
          id: 'optics', 
          title: '光学', 
          progress: 0, 
          weight: 0.2,
          category: 'optics',
          icon: 'lightbulb'
        },
        { 
          id: 'thermodynamics', 
          title: '热学', 
          progress: 0, 
          weight: 0.2,
          category: 'thermodynamics',
          icon: 'temperature-high'
        }
      ]);
      
      // 模拟最近活动数据
      setRecentActivities([
        {
          id: 1,
          type: '测验',
          title: '牛顿运动定律测验',
          score: 85,
          date: '2023-08-15',
          path: '/quiz/results/123'
        },
        {
          id: 2,
          type: '实验',
          title: '自由落体实验',
          status: '已完成',
          date: '2023-08-14',
          path: '/experiment/gravity'
        },
        {
          id: 3,
          type: '学习',
          title: '牛顿三大定律',
          progress: 100,
          date: '2023-08-12',
          path: '/learn/mechanics/newton-laws'
        }
      ]);
      
      setLoading(false);
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar title="仪表盘" />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">欢迎回来，{user?.name || '同学'}</h1>
          <p className="text-gray-600 dark:text-gray-400">继续您的学习之旅</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* 继续学习卡片 */}
            <Card className="p-0 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                <h2 className="text-xl font-bold mb-4">继续学习</h2>
                <p className="mb-6">从上次离开的地方继续您的物理学习</p>
                <Link 
                  to="/learn/mechanics/newton-laws" 
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  继续学习
                  <Icon name="arrow-right" className="ml-2" />
                </Link>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Icon name="book" className="text-blue-600 dark:text-blue-400 mr-2" size="lg" />
                  <div>
                    <h3 className="font-semibold">牛顿运动定律</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">力学 · 第2章</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="font-semibold">35%</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">已完成</p>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 dark:bg-blue-400"
                    style={{ width: '35%' }}
                  ></div>
                </div>
              </div>
            </Card>
            
            {/* 最近活动卡片 */}
            <Card title="最近活动" className="p-6">
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <Link key={activity.id} to={activity.path}>
                    <div className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                        <Icon 
                          name={
                            activity.type === '测验' ? 'question-circle' : 
                            activity.type === '实验' ? 'flask' : 'book'
                          } 
                          color="blue-600 dark:text-blue-400" 
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between">
                          <span>{activity.type}</span>
                          <span>{activity.date}</span>
                        </div>
                      </div>
                      {activity.score && (
                        <div className="ml-4 text-right">
                          <div className="font-semibold">{activity.score}分</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">成绩</div>
                        </div>
                      )}
                      {activity.status && (
                        <div className="ml-4 text-right">
                          <div className="font-semibold text-green-600 dark:text-green-400">
                            {activity.status}
                          </div>
                        </div>
                      )}
                      {activity.progress && (
                        <div className="ml-4 text-right">
                          <div className="font-semibold">{activity.progress}%</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">进度</div>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link to="/dashboard/activities" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                  查看全部活动
                </Link>
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            {/* 学习进度卡片 */}
            <LearningProgress progressData={progressData} />
            
            {/* 推荐学习卡片 */}
            <Card title="推荐学习" className="p-6">
              <div className="space-y-3">
                <Link to="/learn/mechanics/momentum">
                  <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="font-medium mb-1">动量与碰撞</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      根据您的力学学习进度推荐
                    </div>
                  </div>
                </Link>
                <Link to="/learn/mechanics/circular-motion">
                  <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="font-medium mb-1">圆周运动</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      适合您当前的学习水平
                    </div>
                  </div>
                </Link>
              </div>
            </Card>
            
            {/* 学习提示卡片 */}
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 p-5">
              <div className="flex items-start">
                <div className="mr-4">
                  <Icon name="lightbulb" color="amber-500" size="lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">学习小提示</h3>
                  <p className="text-sm text-amber-800/80 dark:text-amber-300/80">
                    每天坚持学习30分钟，可以大幅提高您的物理理解能力。根据艾宾浩斯记忆曲线，定期复习过去学过的内容也很重要。
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 