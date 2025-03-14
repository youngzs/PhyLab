import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import Button from './Button';

/**
 * 主导航栏组件
 */
const Navbar = ({ 
  title = '物理思维实验室',
  showProgressBar = false,
  progress = 0,
  backLink = '/',
  user = null
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // 检查系统主题偏好并设置初始状态
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // 切换主题
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  return (
    <header className="sticky top-0 z-20 bg-opacity-90 backdrop-filter backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to={backLink} className="flex items-center">
            <Icon name="arrow-left" className="mr-2" />
            <Icon name="atom" size="3xl" color="blue-600 dark:text-blue-400" />
            <h1 className="text-xl md:text-2xl font-bold ml-2">{title}</h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {showProgressBar && (
            <div className="hidden md:flex items-center space-x-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">章节进度:</div>
              <div className="w-32 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                <div 
                  className="h-full rounded-full bg-blue-600 dark:bg-blue-400" 
                  style={{width: `${progress}%`}}
                ></div>
              </div>
              <div className="text-sm font-medium">{progress}%</div>
            </div>
          )}
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
          >
            <Icon 
              name={isDarkMode ? "sun" : "moon"} 
              color={isDarkMode ? "yellow-400" : "gray-600 dark:text-gray-300"} 
              className={isDarkMode ? "" : "dark:hidden"}
            />
            <Icon 
              name="sun" 
              color="yellow-400" 
              className={isDarkMode ? "block" : "hidden dark:block"}
            />
          </button>
          
          {user ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Icon name="user" />
              </div>
              <span className="hidden md:inline text-sm font-medium">{user.name}</span>
            </div>
          ) : (
            <Button variant="primary" size="sm">登录</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar; 