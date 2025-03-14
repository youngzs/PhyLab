import React from 'react';

/**
 * 通用按钮组件
 * @param {Object} props - 组件属性
 * @param {string} props.variant - 按钮类型: 'primary', 'secondary', 'outline'
 * @param {string} props.size - 按钮大小: 'sm', 'md', 'lg'
 * @param {boolean} props.disabled - 是否禁用
 * @param {function} props.onClick - 点击事件处理函数
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  className = '',
  ...props 
}) => {
  // 基础类
  const baseStyle = 'rounded-lg transition-all focus:outline-none';
  
  // 尺寸类
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  // 变体类
  const variantClasses = {
    primary: 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:scale-105',
    secondary: 'bg-purple-600 dark:bg-purple-500 text-white hover:bg-purple-700 dark:hover:bg-purple-600 transform hover:scale-105',
    outline: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700',
    danger: 'bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600 transform hover:scale-105',
  };
  
  // 禁用样式
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  const buttonClasses = `
    ${baseStyle}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? disabledClasses : ''}
    ${className}
  `;
  
  return (
    <button 
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 