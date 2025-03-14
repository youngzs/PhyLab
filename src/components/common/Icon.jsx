import React from 'react';

/**
 * 图标组件，封装FontAwesome图标
 * @param {Object} props - 组件属性
 * @param {string} props.name - 图标名称 (不包含fa前缀)
 * @param {string} props.type - 图标类型: 'solid', 'regular', 'brands'
 * @param {string} props.size - 图标大小: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {string} props.color - 颜色类名
 */
const Icon = ({ 
  name, 
  type = 'solid', 
  size = 'md', 
  color = 'inherit',
  className = '',
  ...props 
}) => {
  // 图标类型前缀
  const typePrefix = {
    solid: 'fas',
    regular: 'far',
    brands: 'fab'
  };
  
  // 尺寸类
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl'
  };
  
  // 颜色类
  const colorClass = color !== 'inherit' ? `text-${color}` : '';
  
  const iconClasses = `
    ${typePrefix[type]} fa-${name}
    ${sizeClasses[size]}
    ${colorClass}
    ${className}
  `;
  
  return <i className={iconClasses} {...props}></i>;
};

export default Icon; 