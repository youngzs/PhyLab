import React, { useState } from 'react';
import Navbar from '../../../components/common/Navbar';
import Card from '../../../components/common/Card';
import Tabs from '../../../components/common/Tabs';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';
import KnowledgeMap from '../../../components/mind-map/KnowledgeMap';
import GravityExperiment from '../../../components/experiments/GravityExperiment';

const NewtonLaws = () => {
  // 知识图谱数据
  const knowledgeMapData = {
    nodes: [
      { id: 'intro', name: '力学导论', x: 150, y: 50, size: 40, status: 'completed', detail: '力学的基本概念和研究对象' },
      { id: 'newton1', name: '牛顿第一定律', x: 70, y: 120, size: 45, status: 'completed', detail: '惯性定律：物体保持静止或匀速直线运动的趋势' },
      { id: 'newton2', name: '牛顿第二定律', x: 150, y: 120, size: 45, status: 'in-progress', detail: 'F=ma，力与加速度的关系' },
      { id: 'newton3', name: '牛顿第三定律', x: 230, y: 120, size: 45, status: 'locked', detail: '作用力与反作用力' },
      { id: 'gravity', name: '万有引力', x: 150, y: 190, size: 45, status: 'locked', detail: '万有引力定律与重力加速度' },
    ],
    links: [
      { source: 'intro', target: 'newton1' },
      { source: 'intro', target: 'newton2' },
      { source: 'intro', target: 'newton3' },
      { source: 'newton1', target: 'newton2' },
      { source: 'newton2', target: 'newton3' },
      { source: 'newton2', target: 'gravity' },
      { source: 'newton3', target: 'gravity' },
    ]
  };

  // 选中的知识点
  const [selectedNode, setSelectedNode] = useState('newton2');
  
  // 标签页内容
  const tabsContent = [
    {
      id: 'learn',
      label: '知识学习',
      content: (
        <div>
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">牛顿第二定律</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>牛顿第二定律是经典力学中最基本的定律之一，它描述了力、质量和加速度之间的关系。</p>
              
              <div className="formula-block my-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                <div className="formula text-xl text-center my-2">F = ma</div>
                <p className="text-sm">其中，F表示合外力，m表示质量，a表示加速度</p>
              </div>
              
              <p>这一定律表明：</p>
              <ul>
                <li>物体的加速度与所受的合外力成正比</li>
                <li>物体的加速度与其质量成反比</li>
                <li>加速度的方向与合外力的方向相同</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">牛顿第二定律的应用</h3>
              <p>牛顿第二定律可以用来解决许多力学问题，例如：</p>
              <ul>
                <li>计算物体在已知外力作用下的加速度</li>
                <li>由已知加速度推算作用力</li>
                <li>分析多个力共同作用的情况</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">重力与牛顿第二定律</h3>
              <p>当物体在地球表面附近时，受到的重力可以表示为：</p>
              <div className="formula-block my-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                <div className="formula text-xl text-center my-2">F<sub>g</sub> = mg</div>
                <p className="text-sm">其中，F<sub>g</sub>表示重力，m表示质量，g表示重力加速度（约9.8 m/s²）</p>
              </div>
            </div>
          </Card>
          
          <GravityExperiment />
        </div>
      )
    },
    {
      id: 'quiz',
      label: '习题测验',
      content: (
        <div>
          <Card className="p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">牛顿定律练习题</h2>
              <div className="flex items-center">
                <div className="text-sm mr-4">题目进度: <span className="font-medium">1/5</span></div>
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-full w-1/5 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="quiz-question">
              <p className="text-lg font-medium mb-4">1. 一个质量为2千克的物体受到4牛顿的合外力作用，它的加速度是多少？</p>
              
              <div className="space-y-3 mb-6">
                <div className="quiz-option p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center mr-3">
                      <div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-500 hidden option-dot"></div>
                    </div>
                    <div>A. 0.5 m/s²</div>
                  </div>
                </div>
                
                <div className="quiz-option p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center mr-3">
                      <div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-500 hidden option-dot"></div>
                    </div>
                    <div>B. 2 m/s²</div>
                  </div>
                </div>
                
                <div className="quiz-option p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center mr-3">
                      <div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-500 hidden option-dot"></div>
                    </div>
                    <div>C. 4 m/s²</div>
                  </div>
                </div>
                
                <div className="quiz-option p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center mr-3">
                      <div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-500 hidden option-dot"></div>
                    </div>
                    <div>D. 8 m/s²</div>
                  </div>
                </div>
              </div>
              
              <div className="quiz-feedback hidden mt-4 p-4 rounded-lg">
                <div className="quiz-correct hidden text-green-600 dark:text-green-400">
                  <div className="flex items-start">
                    <Icon name="check-circle" className="mt-1 mr-2" />
                    <div>
                      <p className="font-medium">正确！</p>
                      <p>根据牛顿第二定律，a = F/m = 4N/2kg = 2 m/s²</p>
                    </div>
                  </div>
                </div>
                
                <div className="quiz-incorrect hidden text-red-600 dark:text-red-400">
                  <div className="flex items-start">
                    <Icon name="times-circle" className="mt-1 mr-2" />
                    <div>
                      <p className="font-medium">不正确</p>
                      <p>根据牛顿第二定律，a = F/m = 4N/2kg = 2 m/s²</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" disabled>上一题</Button>
                <Button variant="primary">下一题</Button>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'notes',
      label: '我的笔记',
      content: (
        <div>
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">学习笔记</h2>
              <Button variant="primary">
                <Icon name="plus" className="mr-2" />
                新建笔记
              </Button>
            </div>
            
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">牛顿第二定律公式记忆</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">2小时前</div>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">牛顿第二定律的公式是F=ma，可以记忆为"Force等于mass乘以acceleration"，这也解释了为什么重的物体比轻的物体更难推动...</p>
              <div className="flex mt-2">
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full mr-2">牛顿定律</span>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full">记忆技巧</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">重力加速度应用</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">昨天</div>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">自由落体运动中，重力加速度g是一个常量，约为9.8 m/s²。这意味着在真空环境中，所有物体无论质量大小都会以相同的加速度下落...</p>
              <div className="flex mt-2">
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full mr-2">重力</span>
                <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full">实验结论</span>
              </div>
            </div>
          </Card>
        </div>
      )
    }
  ];

  const handleNodeClick = (node) => {
    setSelectedNode(node.id);
    // 这里可以添加加载相应内容的逻辑
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar 
        title="牛顿运动定律与重力" 
        backLink="/"
        showProgressBar={true}
        progress={35}
      />
      
      <main className="container mx-auto px-4 py-8 animation-fade">
        {/* 知识导航图谱 */}
        <section className="mb-8">
          <KnowledgeMap 
            nodes={knowledgeMapData.nodes}
            links={knowledgeMapData.links}
            onNodeClick={handleNodeClick}
          />
        </section>
        
        {/* 主内容区域 */}
        <section>
          <Tabs tabs={tabsContent} defaultTab="learn" />
        </section>
        
        {/* 侧边按钮 */}
        <div className="fixed right-6 bottom-6 flex flex-col space-y-3">
          <button className="w-12 h-12 rounded-full bg-purple-600 dark:bg-purple-500 text-white shadow-lg flex items-center justify-center hover:transform hover:scale-110 transition-all">
            <Icon name="question-circle" size="lg" />
          </button>
          <button className="w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 text-white shadow-lg flex items-center justify-center hover:transform hover:scale-110 transition-all">
            <Icon name="arrow-up" size="lg" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default NewtonLaws; 