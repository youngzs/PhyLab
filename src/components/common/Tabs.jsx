import React, { useState } from 'react';

/**
 * 标签页组件
 * @param {Object} props - 组件属性
 * @param {Array} props.tabs - 标签页配置数组，每个元素包含 {id, label, content}
 * @param {string} props.defaultTab - 默认选中的标签页ID
 */
const Tabs = ({ 
  tabs = [], 
  defaultTab = tabs.length > 0 ? tabs[0].id : '' 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <div>
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            className={`
              px-4 py-2 font-medium border-b-2 
              ${activeTab === tab.id 
                ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' 
                : 'border-transparent hover:text-blue-600 dark:hover:text-blue-400'}
            `}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="tab-content-container">
        {tabs.map((tab) => (
          <div 
            key={tab.id}
            className={`tab-content ${activeTab === tab.id ? 'active' : 'hidden'}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs; 