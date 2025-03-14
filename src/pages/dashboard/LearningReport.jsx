import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Card from '../../components/common/Card';
import Icon from '../../components/common/Icon';
import { useUser } from '../../store/UserContext';

const LearningReport = () => {
  const { user } = useUser();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 模拟从API获取学习报告数据
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        // 实际项目中应从API获取数据
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 模拟数据
        const data = {
          summary: {
            totalTime: 28.5, // 小时
            chaptersCompleted: 7,
            experimentsCompleted: 5,
            quizzesCompleted: 12,
            averageScore: 85
          },
          strengths: [
            { category: '牛顿定律', score: 92, icon: 'apple-alt' },
            { category: '动量守恒', score: 88, icon: 'atom' }
          ],
          weaknesses: [
            { category: '圆周运动', score: 65, icon: 'circle-notch' },
            { category: '电学基础', score: 72, icon: 'bolt' }
          ],
          recentActivities: [
            { 
              id: 1, 
              type: 'quiz', 
              title: '牛顿第二定律测验', 
              score: 85, 
              date: '2023-08-15',
              duration: 18 // 分钟
            },
            { 
              id: 2, 
              type: 'experiment', 
              title: '自由落体运动实验', 
              completionRate: 100, 
              date: '2023-08-14',
              duration: 45 // 分钟
            },
            { 
              id: 3, 
              type: 'lesson', 
              title: '圆周运动学习', 
              progress: 80, 
              date: '2023-08-13',
              duration: 50 // 分钟
            }
          ],
          recommendations: [
            { 
              id: 'rec1', 
              title: '圆周运动进阶练习',
              type: 'practice',
              reason: '根据您的薄弱环节推荐',
              icon: 'circle-notch',
              link: '/learn/mechanics/circular-motion/practice'
            },
            { 
              id: 'rec2', 
              title: '电场与磁场基础',
              type: 'lesson',
              reason: '下一步学习建议',
              icon: 'bolt',
              link: '/learn/electricity/fields'
            }
          ]
        };
        
        setReportData(data);
        setLoading(false);
      } catch (error) {
        console.error('获取学习报告失败:', error);
        setLoading(false);
      }
    };
    
    fetchReportData();
  }, []);
  
  // 图标映射
  const iconMap = {
    'quiz': 'question-circle',
    'experiment': 'flask',
    'lesson': 'book',
    'practice': 'pencil-alt'
  };
  
  // 颜色映射
  const colorMap = {
    'quiz': 'purple',
    'experiment': 'blue',
    'lesson': 'indigo',
    'practice': 'green'
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar title="学习报告" backLink="/dashboard" />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
          <div className="flex items-center">
            <Icon name="spinner" size="2xl" className="animate-spin mr-3 text-blue-600 dark:text-blue-400" />
            <span className="text-lg">加载学习报告中...</span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar title="学习报告" backLink="/dashboard" user={user} />
      
      <main className="container mx-auto px-4 py-8 animation-fade">
        <h1 className="text-2xl font-bold mb-6">您的学习报告</h1>
        
        {/* 概述卡片 */}
        <section className="mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">学习概述</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                <div className="text-blue-600 dark:text-blue-400 text-2xl font-bold mb-1">
                  {reportData.summary.totalTime}h
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">总学习时间</div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                <div className="text-green-600 dark:text-green-400 text-2xl font-bold mb-1">
                  {reportData.summary.chaptersCompleted}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">已完成章节</div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
                <div className="text-purple-600 dark:text-purple-400 text-2xl font-bold mb-1">
                  {reportData.summary.experimentsCompleted}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">已完成实验</div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-center">
                <div className="text-yellow-600 dark:text-yellow-400 text-2xl font-bold mb-1">
                  {reportData.summary.quizzesCompleted}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">已完成测验</div>
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 text-center">
                <div className="text-indigo-600 dark:text-indigo-400 text-2xl font-bold mb-1">
                  {reportData.summary.averageScore}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">平均得分</div>
              </div>
            </div>
          </Card>
        </section>
        
        {/* 优势与弱点 */}
        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              <Icon name="star" color="yellow-400" className="mr-2" />
              擅长领域
            </h2>
            <div className="space-y-4">
              {reportData.strengths.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
                    <Icon name={item.icon} color="green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{item.category}</span>
                      <span>{item.score}分</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div 
                        className="h-full bg-green-500 dark:bg-green-400 rounded-full"
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              <Icon name="exclamation-triangle" color="yellow-500" className="mr-2" />
              待提高领域
            </h2>
            <div className="space-y-4">
              {reportData.weaknesses.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-4">
                    <Icon name={item.icon} color="yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{item.category}</span>
                      <span>{item.score}分</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div 
                        className="h-full bg-yellow-500 dark:bg-yellow-400 rounded-full"
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
        
        {/* 近期活动 */}
        <section className="mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              <Icon name="history" color="blue-600 dark:text-blue-400" className="mr-2" />
              近期学习活动
            </h2>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">活动</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">结果</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">时长</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">日期</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {reportData.recentActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full bg-${colorMap[activity.type]}-100 dark:bg-${colorMap[activity.type]}-900/30 flex items-center justify-center mr-3`}>
                            <Icon name={iconMap[activity.type]} color={`${colorMap[activity.type]}-600 dark:text-${colorMap[activity.type]}-400`} />
                          </div>
                          <div>
                            <div className="font-medium">{activity.title}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{activity.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {activity.type === 'quiz' && <span>{activity.score}分</span>}
                        {activity.type === 'experiment' && <span>{activity.completionRate}%完成</span>}
                        {activity.type === 'lesson' && <span>{activity.progress}%进度</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {activity.duration}分钟
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {activity.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
        
        {/* 学习建议 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">学习建议</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportData.recommendations.map((rec) => (
              <Card key={rec.id} className="p-5 hover:shadow-md transition-all">
                <a href={rec.link} className="block">
                  <div className="flex items-start">
                    <div className={`w-10 h-10 rounded-full bg-${colorMap[rec.type]}-100 dark:bg-${colorMap[rec.type]}-900/30 flex items-center justify-center mr-4 mt-1`}>
                      <Icon name={rec.icon} color={`${colorMap[rec.type]}-600 dark:text-${colorMap[rec.type]}-400`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{rec.title}</h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <Icon name={iconMap[rec.type]} className="mr-1" size="sm" />
                        <span className="capitalize">{rec.type}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{rec.reason}</p>
                    </div>
                  </div>
                </a>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LearningReport; 