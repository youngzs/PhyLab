import React from 'react';
import Card from '../common/Card';
import Icon from '../common/Icon';

const LearningProgress = ({ progressData }) => {
  // 计算总体进度
  const totalProgress = progressData.reduce((acc, curr) => {
    return acc + (curr.weight * curr.progress / 100);
  }, 0);
  
  // 进度条颜色映射
  const colorMap = {
    'mechanics': 'blue',
    'electricity': 'purple',
    'optics': 'pink',
    'thermodynamics': 'amber',
    'quantum': 'emerald'
  };
  
  return (
    <Card title="学习进度" className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-lg font-bold">{Math.round(totalProgress)}%</span>
            <span className="text-gray-600 dark:text-gray-400 ml-2">总体进度</span>
          </div>
          <a href="/dashboard/progress" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
            查看详情
          </a>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
            style={{ width: `${totalProgress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-4">
        {progressData.map((item) => (
          <div key={item.id}>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Icon 
                  name={item.icon} 
                  color={`${colorMap[item.category] || 'gray'}-600 dark:text-${colorMap[item.category] || 'gray'}-400`} 
                  className="mr-2" 
                />
                <span>{item.title}</span>
              </div>
              <span className="text-sm font-medium">{item.progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-${colorMap[item.category] || 'gray'}-500 dark:bg-${colorMap[item.category] || 'gray'}-400`}
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LearningProgress; 