import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import QuizQuestion from '../../components/quiz/QuizQuestion';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Icon from '../../components/common/Icon';

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  
  // 模拟从API获取测验数据
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 这里应该是真实的API调用
        // 模拟测验数据
        const data = {
          id: quizId,
          title: '牛顿运动定律综合测验',
          description: '测试您对牛顿三大运动定律的理解',
          timeLimit: 20, // 分钟
          questions: [
            {
              id: 'q1',
              type: 'multiple-choice',
              difficulty: 'easy',
              text: '物体在没有外力作用下，将保持静止或匀速直线运动状态。这是牛顿运动定律中的：',
              options: [
                { id: 'a', text: '牛顿第一定律' },
                { id: 'b', text: '牛顿第二定律' },
                { id: 'c', text: '牛顿第三定律' },
                { id: 'd', text: '万有引力定律' }
              ],
              correctOption: 'a',
              correctFeedback: '正确！牛顿第一定律也称为惯性定律，描述了物体在没有外力作用下的运动状态。',
              incorrectFeedback: '不正确。牛顿第一定律（惯性定律）描述了物体在没有外力作用下的运动状态。',
              solution: '牛顿第一定律，也称为惯性定律，是由艾萨克·牛顿在《自然哲学的数学原理》中提出的。该定律指出，一个物体在没有外力作用下，将保持静止或匀速直线运动状态。',
              hint: '考虑物体的"惯性"这一概念。'
            },
            {
              id: 'q2',
              type: 'multiple-choice',
              difficulty: 'medium',
              text: '一个质量为2kg的物体受到4N的力，其加速度是多少？',
              options: [
                { id: 'a', text: '0.5 m/s²' },
                { id: 'b', text: '2 m/s²' },
                { id: 'c', text: '8 m/s²' },
                { id: 'd', text: '16 m/s²' }
              ],
              correctOption: 'b',
              correctFeedback: '正确！根据牛顿第二定律F=ma，加速度a = F/m = 4N/2kg = 2 m/s²。',
              incorrectFeedback: '不正确。根据牛顿第二定律F=ma，加速度a = F/m = 4N/2kg = 2 m/s²。',
              solution: '利用牛顿第二定律公式 F = ma，可以得到 a = F/m = 4N/2kg = 2 m/s²',
              hint: '使用公式F=ma，并将已知的力和质量代入。'
            },
            {
              id: 'q3',
              type: 'multiple-choice',
              difficulty: 'hard',
              text: '一个物体在光滑平面上以5 m/s的初速度滑行，受到2N的恒定阻力，物体的质量为10kg。问物体运动4秒后的速度是多少？',
              image: '/images/quiz/physics_problem.png',
              options: [
                { id: 'a', text: '1 m/s' },
                { id: 'b', text: '3 m/s' },
                { id: 'c', text: '4.2 m/s' },
                { id: 'd', text: '5 m/s' }
              ],
              correctOption: 'b',
              correctFeedback: '正确！根据牛顿第二定律，物体的加速度a = F/m = 2N/10kg = 0.2 m/s²，由于是阻力，加速度方向与速度方向相反，所以是减速运动。速度变化量 Δv = a·t = -0.2 m/s² × 4s = -0.8 m/s。最终速度 v = 5 m/s - 0.8 m/s = 4.2 m/s。',
              incorrectFeedback: '不正确。根据牛顿第二定律和匀加速运动公式计算。',
              solution: '由于阻力与运动方向相反，物体做减速运动。\n根据牛顿第二定律 F = ma，加速度 a = F/m = 2N/10kg = 0.2 m/s²\n加速度方向与速度方向相反，所以 a = -0.2 m/s²\n根据匀加速直线运动公式 v = v₀ + at，代入 v = 5 + (-0.2 × 4) = 5 - 0.8 = 4.2 m/s',
              hint: '计算加速度，注意阻力导致的是减速运动，然后使用匀加速运动公式。'
            }
          ]
        };
        
        setQuizData(data);
        setTimeLeft(data.timeLimit * 60); // 转换为秒
        setLoading(false);
      } catch (error) {
        console.error('获取测验数据失败:', error);
        setLoading(false);
      }
    };
    
    fetchQuizData();
  }, [quizId]);
  
  // 计时器
  useEffect(() => {
    if (!loading && timeLeft !== null && timeLeft > 0 && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleQuizComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [loading, timeLeft, quizCompleted]);
  
  const handleQuestionSubmit = (isCorrect) => {
    if (isCorrect === 'next') {
      // 用户点击了"下一题"按钮
      if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        handleQuizComplete();
      }
      return;
    }
    
    // 记录答题结果
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = isCorrect;
    setUserAnswers(updatedAnswers);
  };
  
  const handleQuizComplete = () => {
    setQuizCompleted(true);
    
    // 这里可以添加向API提交结果的逻辑
    console.log('测验完成', userAnswers);
  };
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar title="加载测验..." backLink="/learn" />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <Icon name="spinner" size="3xl" className="animate-spin text-blue-600 dark:text-blue-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">正在加载测验内容，请稍候...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (quizCompleted) {
    // 计算得分
    const correctAnswers = userAnswers.filter(answer => answer === true).length;
    const score = Math.round((correctAnswers / quizData.questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar title="测验结果" backLink="/learn" />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto p-6">
            <div className="text-center mb-6">
              <div className="inline-block p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                <Icon name="clipboard-check" size="3xl" color="blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold">{quizData.title} - 完成!</h1>
            </div>
            
            <div className="mb-8">
              <div className="w-48 h-48 mx-auto relative">
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{score}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">得分</div>
                  </div>
                </div>
                <svg className="absolute top-0 left-0" width="100%" height="100%" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="8"
                    strokeDasharray={`${score * 2.83} 283`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">测验统计</h2>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">正确答题</div>
                    <div className="font-bold text-green-600 dark:text-green-400">
                      {correctAnswers}/{quizData.questions.length}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">完成时间</div>
                    <div className="font-bold">
                      {quizData.timeLimit - Math.ceil(timeLeft/60)}分钟
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">等级</div>
                    <div className="font-bold text-blue-600 dark:text-blue-400">
                      {score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate('/learn')}
              >
                <Icon name="arrow-left" className="mr-2" />
                返回学习
              </Button>
              
              <Button 
                variant="primary" 
                onClick={() => navigate('/quiz/review/' + quizId)}
              >
                查看详细解析
                <Icon name="search" className="ml-2" />
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar title={quizData.title} backLink="/learn" />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* 进度指示器 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-lg font-bold mr-2">问题 {currentQuestionIndex + 1}/{quizData.questions.length}</span>
                {timeLeft !== null && (
                  <span className={`ml-4 py-1 px-3 rounded-full text-sm ${
                    timeLeft > 300 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 
                    timeLeft > 60 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' : 
                    'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 animate-pulse'
                  }`}>
                    <Icon name="clock" className="mr-1" />
                    {formatTime(timeLeft)}
                  </span>
                )}
              </div>
              <div>
                <button 
                  className="text-red-600 dark:text-red-400 font-medium text-sm hover:underline"
                  onClick={handleQuizComplete}
                >
                  结束测验
                </button>
              </div>
            </div>
            
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex) / quizData.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* 当前问题 */}
          <QuizQuestion 
            question={quizData.questions[currentQuestionIndex]} 
            onSubmit={handleQuestionSubmit}
          />
        </div>
      </main>
    </div>
  );
};

export default QuizPage; 