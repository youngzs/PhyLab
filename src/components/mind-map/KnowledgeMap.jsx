import React, { useState, useEffect, useRef } from 'react';

/**
 * 知识图谱导航组件
 * @param {Object} props - 组件属性
 * @param {Array} props.nodes - 知识点节点数据
 * @param {Array} props.links - 知识点连接关系
 * @param {function} props.onNodeClick - 节点点击处理函数
 */
const KnowledgeMap = ({ 
  nodes = [], 
  links = [], 
  onNodeClick = () => {}
}) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: '',
    x: 0,
    y: 0
  });
  
  const mapRef = useRef(null);
  
  // 计算节点位置和连接线
  useEffect(() => {
    if (!mapRef.current) return;
    
    // 清除现有内容
    const container = mapRef.current;
    container.innerHTML = '';
    
    // 绘制连接线
    links.forEach(link => {
      const source = nodes.find(n => n.id === link.source);
      const target = nodes.find(n => n.id === link.target);
      
      if (!source || !target) return;
      
      // 计算连接线的位置和角度
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      // 创建连接线
      const linkElement = document.createElement('div');
      linkElement.className = 'knowledge-link';
      linkElement.style.width = `${length}px`;
      linkElement.style.left = `${source.x}px`;
      linkElement.style.top = `${source.y}px`;
      linkElement.style.transform = `rotate(${angle}deg)`;
      
      container.appendChild(linkElement);
    });
    
    // 创建节点
    nodes.forEach(node => {
      // 创建节点
      const nodeElement = document.createElement('div');
      nodeElement.className = `knowledge-node ${node.status}`;
      nodeElement.style.width = `${node.size}px`;
      nodeElement.style.height = `${node.size}px`;
      nodeElement.style.left = `${node.x - node.size/2}px`;
      nodeElement.style.top = `${node.y - node.size/2}px`;
      nodeElement.textContent = node.name;
      nodeElement.dataset.id = node.id;
      
      // 添加事件处理
      nodeElement.addEventListener('mouseover', () => {
        setTooltip({
          visible: true,
          content: node.detail,
          x: node.x + node.size/2 + 10,
          y: node.y
        });
      });
      
      nodeElement.addEventListener('mouseout', () => {
        setTooltip({
          ...tooltip,
          visible: false
        });
      });
      
      nodeElement.addEventListener('click', () => {
        if (node.status !== 'locked') {
          onNodeClick(node);
          
          // 视觉反馈
          document.querySelectorAll('.knowledge-node').forEach(n => {
            n.classList.remove('active');
          });
          nodeElement.classList.add('active');
        }
      });
      
      container.appendChild(nodeElement);
    });
  }, [nodes, links, onNodeClick]);
  
  return (
    <div className="card p-4 rounded-xl">
      <h2 className="text-lg font-semibold mb-3">力学知识导航</h2>
      <div className="knowledge-map relative" ref={mapRef} style={{ height: '250px' }}>
        {/* 节点和连接由useEffect生成 */}
      </div>
      <div 
        className="tooltip absolute bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 rounded-lg shadow-lg z-10"
        style={{
          left: `${tooltip.x}px`,
          top: `${tooltip.y}px`,
          visibility: tooltip.visible ? 'visible' : 'hidden',
          opacity: tooltip.visible ? 1 : 0
        }}
      >
        {tooltip.content}
      </div>
    </div>
  );
};

export default KnowledgeMap; 