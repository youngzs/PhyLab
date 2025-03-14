import React, { createContext, useState, useContext, useEffect } from 'react';

// 创建上下文
const UserContext = createContext(null);

// 自定义钩子，用于访问用户上下文
export const useUser = () => useContext(UserContext);

// 用户上下文提供器
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 模拟获取用户信息
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 在实际项目中，这里应该是从API获取用户数据
        setTimeout(() => {
          // 模拟的用户数据
          const userData = {
            id: '1',
            name: '张三',
            email: 'zhangsan@example.com',
            avatar: null,
            progress: {
              mechanics: 35,
              electricity: 10,
              optics: 0
            }
          };
          
          setUser(userData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('获取用户信息失败:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 登录功能
  const login = async (credentials) => {
    try {
      // 在实际项目中，这里应该是调用登录API
      console.log('登录凭证:', credentials);
      
      // 模拟登录成功
      const userData = {
        id: '1',
        name: '张三',
        email: credentials.email,
        avatar: null,
        progress: {
          mechanics: 35,
          electricity: 10,
          optics: 0
        }
      };
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('登录失败:', error);
      return { success: false, error: '登录失败，请检查用户名和密码' };
    }
  };

  // 登出功能
  const logout = () => {
    setUser(null);
  };

  // 更新用户学习进度
  const updateProgress = (subject, value) => {
    if (user && user.progress) {
      setUser({
        ...user,
        progress: {
          ...user.progress,
          [subject]: value
        }
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout, updateProgress }}>
      {children}
    </UserContext.Provider>
  );
}; 