import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Icon from '../common/Icon';

const QuizQuestion = ({ 
  question, 
  onSubmit,
  showFeedback = true,
  showSolution = true
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const handleOptionSelect = (optionId) => {
    if (!submitted) {
      setSelectedOption(optionId);
    }
  };
  
  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    setSubmitted(true);
    const isCorrect = selectedOption === question.correctOption;
    onSubmit(isCorrect);
  };
  
  return (
    <Card className="p-5">
      <div className="mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {question.type === 'multiple-choice' ? '单选题' : 
             question.type === 'multiple-answer' ? '多选题' : 
             question.type === 'true-false' ? '判断题' : '题目'}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            难度: {
              question.difficulty === 'easy' ? '简单' :
              question.difficulty === 'medium' ? '中等' : '困难'
            }
          </span>
        </div>
        <h3 className="text-lg font-semibold mt-1 mb-2">{question.text}</h3>
        
        {question.image && (
          <div className="my-3">
            <img 
              src={question.image} 
              alt="问题图片" 
              className="max-w-full rounded-lg mx-auto"
              style={{ maxHeight: '200px' }} 
            />
          </div>
        )}
      </div>
      
      <div className="space-y-2 mb-4">
        {question.options.map((option) => (
          <div 
            key={option.id}
            className={`
              p-3 border rounded-lg cursor-pointer transition-all
              ${selectedOption === option.id ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'}
              ${submitted && option.id === question.correctOption ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20' : ''}
              ${submitted && selectedOption === option.id && option.id !== question.correctOption ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' : ''}
            `}
            onClick={() => handleOptionSelect(option.id)}
          >
            <div className="flex items-start">
              <div className={`
                w-6 h-6 rounded-full border flex items-center justify-center mr-2 mt-0.5 flex-shrink-0
                ${selectedOption === option.id ? 'border-blue-500 dark:border-blue-400' : 'border-gray-400 dark:border-gray-500'}
                ${submitted && option.id === question.correctOption ? 'border-green-500 dark:border-green-400 bg-green-500 dark:bg-green-400 text-white' : ''}
                ${submitted && selectedOption === option.id && option.id !== question.correctOption ? 'border-red-500 dark:border-red-400 bg-red-500 dark:bg-red-400 text-white' : ''}
              `}>
                {submitted && option.id === question.correctOption && (
                  <Icon name="check" size="xs" />
                )}
                {submitted && selectedOption === option.id && option.id !== question.correctOption && (
                  <Icon name="times" size="xs" />
                )}
              </div>
              <div>
                <div className="font-medium">{option.text}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {showFeedback && submitted && (
        <div className={`
          p-3 rounded-lg mb-4
          ${selectedOption === question.correctOption ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'}
        `}>
          <div className="flex items-start">
            <div className="mr-2 mt-1">
              <Icon name={selectedOption === question.correctOption ? 'check-circle' : 'exclamation-circle'} />
            </div>
            <div>
              <div className="font-medium mb-1">
                {selectedOption === question.correctOption ? '回答正确!' : '回答错误'}
              </div>
              <div className="text-sm">
                {selectedOption === question.correctOption ? question.correctFeedback : question.incorrectFeedback}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!submitted && question.hint && (
        <div className="mb-4">
          <button 
            onClick={() => setShowHint(!showHint)}
            className="text-blue-600 dark:text-blue-400 text-sm flex items-center"
          >
            <Icon name={showHint ? 'chevron-up' : 'chevron-down'} className="mr-1" size="sm" />
            {showHint ? '隐藏提示' : '查看提示'}
          </button>
          
          {showHint && (
            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg text-sm">
              <div className="flex items-start">
                <Icon name="lightbulb" className="mr-2 mt-1" />
                <div>{question.hint}</div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {showSolution && submitted && question.solution && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="font-medium mb-1">解析:</div>
          <div className="text-sm">{question.solution}</div>
        </div>
      )}
      
      <div className="flex justify-between">
        {!submitted ? (
          <Button 
            onClick={handleSubmit} 
            disabled={selectedOption === null}
            variant="primary"
          >
            提交答案
          </Button>
        ) : (
          <Button variant="outline" onClick={() => onSubmit('next')}>
            下一题 <Icon name="arrow-right" className="ml-1" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default QuizQuestion; 