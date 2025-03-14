import React from 'react';

/**
 * 卡片组件
 * @param {Object} props - 组件属性
 * @param {string} props.title - 卡片标题
 * @param {boolean} props.hover - 是否启用悬停效果
 * @param {string} props.className - 额外的CSS类
 */
const Card = ({ 
  children, 
  title, 
  hover = true, 
  className = '', 
  ...props 
}) => {
  const cardClasses = `
    bg-white dark:bg-gray-900 
    border border-gray-200 dark:border-gray-700 
    rounded-xl p-4 
    ${hover ? 'transition-all hover:transform hover:translate-y-[-5px] hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-400' : ''}
    ${className}
  `;
  
  return (
    <div className={cardClasses} {...props}>
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      {children}
    </div>
  );
};

export default Card; 