import React, { useState, useRef, useEffect } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';

/**
 * 自由落体实验模拟组件
 */
const GravityExperiment = () => {
  const [mass, setMass] = useState(1);
  const [height, setHeight] = useState(15);
  const [fallTime, setFallTime] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [experimenting, setExperimenting] = useState(false);
  const [experimentData, setExperimentData] = useState([]);
  
  const gravityObjectRef = useRef(null);
  const experimentAreaRef = useRef(null);
  const animationRef = useRef(null);
  
  // 重力加速度常量
  const g = 9.8; // m/s²
  
  // 更新小球位置和大小
  useEffect(() => {
    if (!gravityObjectRef.current || !experimentAreaRef.current) return;
    
    const container = experimentAreaRef.current;
    const object = gravityObjectRef.current;
    const groundHeight = 20;
    const containerHeight = container.offsetHeight;
    
    // 更新小球大小（根据质量）
    const size = 20 + mass * 2;
    object.style.width = `${size}px`;
    object.style.height = `${size}px`;
    
    // 更新小球位置（根据高度）
    const topPosition = containerHeight - groundHeight - (containerHeight - groundHeight) * (height / 15);
    object.style.top = `${topPosition}px`;
    
  }, [mass, height]);
  
  // 开始实验
  const startExperiment = () => {
    if (experimenting) return;
    
    setExperimenting(true);
    
    const container = experimentAreaRef.current;
    const object = gravityObjectRef.current;
    const groundHeight = 20;
    const containerHeight = container.offsetHeight;
    
    const initialTop = parseFloat(object.style.top);
    const finalTop = containerHeight - groundHeight - object.offsetHeight / 2;
    
    // 计算理论下落时间
    const theoreticalTime = Math.sqrt(2 * height / g);
    
    // 动画开始时间
    const startTime = Date.now();
    
    // 取消之前的动画
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // 动画函数
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000; // 秒
      
      if (elapsed < theoreticalTime) {
        // 计算当前位置
        const distance = 0.5 * g * elapsed * elapsed;
        const progress = distance / height;
        const currentTop = initialTop + progress * (finalTop - initialTop);
        
        // 更新位置和数据
        object.style.top = `${currentTop}px`;
        setFallTime(elapsed.toFixed(2));
        setVelocity((g * elapsed).toFixed(2));
        
        // 继续动画
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // 动画结束
        object.style.top = `${finalTop}px`;
        setFallTime(theoreticalTime.toFixed(2));
        setVelocity((g * theoreticalTime).toFixed(2));
        setExperimenting(false);
        
        // 记录实验数据
        const newExperiment = {
          id: experimentData.length + 1,
          mass,
          height,
          theoreticalTime: theoreticalTime.toFixed(2),
          actualTime: theoreticalTime.toFixed(2),
          velocity: (g * theoreticalTime).toFixed(2)
        };
        
        setExperimentData([...experimentData, newExperiment]);
      }
    };
    
    // 开始动画
    animationRef.current = requestAnimationFrame(animate);
  };
  
  // 重置实验
  const resetExperiment = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    setExperimenting(false);
    setFallTime(0);
    setVelocity(0);
    
    // 重置小球位置
    if (gravityObjectRef.current && experimentAreaRef.current) {
      const container = experimentAreaRef.current;
      const object = gravityObjectRef.current;
      const groundHeight = 20;
      const containerHeight = container.offsetHeight;
      
      const topPosition = containerHeight - groundHeight - (containerHeight - groundHeight) * (height / 15);
      object.style.top = `${topPosition}px`;
    }
  };
  
  return (
    <Card className="p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">自由落体运动模拟实验</h2>
      <p className="mb-4">通过改变物体的质量和释放高度，观察自由落体运动的规律。</p>
      
      <div 
        className="experiment-area relative bg-gray-100 dark:bg-gray-800/50 h-[300px] rounded-lg overflow-hidden" 
        ref={experimentAreaRef}
      >
        <div className="physics-container h-full relative">
          <div className="physics-scale absolute left-[10px] top-0 bottom-[20px] w-[30px] flex flex-col justify-between py-[10px]">
            <div className="scale-mark flex items-center">
              <div className="scale-line w-[10px] h-[1px] bg-current"></div>
              <div className="scale-text text-[0.7rem] ml-[5px]">0m</div>
            </div>
            <div className="scale-mark flex items-center">
              <div className="scale-line w-[10px] h-[1px] bg-current"></div>
              <div className="scale-text text-[0.7rem] ml-[5px]">5m</div>
            </div>
            <div className="scale-mark flex items-center">
              <div className="scale-line w-[10px] h-[1px] bg-current"></div>
              <div className="scale-text text-[0.7rem] ml-[5px]">10m</div>
            </div>
            <div className="scale-mark flex items-center">
              <div className="scale-line w-[10px] h-[1px] bg-current"></div>
              <div className="scale-text text-[0.7rem] ml-[5px]">15m</div>
            </div>
          </div>
          
          <div 
            className="gravity-object absolute w-[30px] h-[30px] rounded-full bg-blue-600 dark:bg-blue-500 left-1/2 transform -translate-x-1/2 top-[10px] shadow-lg"
            ref={gravityObjectRef}
          ></div>
          
          <div className="physics-ground absolute bottom-0 left-0 right-0 h-[20px] bg-gray-300 dark:bg-gray-700 rounded-t-md"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <label className="block text-sm font-medium mb-2">物体质量 (kg)</label>
          <div className="flex items-center">
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={mass}
              onChange={(e) => setMass(parseInt(e.target.value))}
              className="w-full"
            />
            <span className="ml-2 text-sm font-medium">{mass} kg</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">注：在忽略空气阻力的情况下，质量不影响下落时间</div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">释放高度 (m)</label>
          <div className="flex items-center">
            <input 
              type="range" 
              min="1" 
              max="15" 
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              className="w-full" 
            />
            <span className="ml-2 text-sm font-medium">{height} m</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-6">
        <div>
          <div className="text-sm font-medium">下落时间: <span>{fallTime}</span> 秒</div>
          <div className="text-sm font-medium">下落速度: <span>{velocity}</span> m/s</div>
        </div>
        <div>
          <Button 
            variant="primary" 
            disabled={experimenting}
            onClick={startExperiment}
          >
            开始实验
          </Button>
          <Button 
            variant="outline" 
            className="ml-2"
            onClick={resetExperiment}
          >
            重置
          </Button>
        </div>
      </div>
      
      {experimentData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">实验数据</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-sm">序号</th>
                  <th className="px-4 py-2 text-left text-sm">质量 (kg)</th>
                  <th className="px-4 py-2 text-left text-sm">高度 (m)</th>
                  <th className="px-4 py-2 text-left text-sm">理论时间 (s)</th>
                  <th className="px-4 py-2 text-left text-sm">实际时间 (s)</th>
                  <th className="px-4 py-2 text-left text-sm">落地速度 (m/s)</th>
                </tr>
              </thead>
              <tbody>
                {experimentData.map(exp => (
                  <tr key={exp.id}>
                    <td className="border px-4 py-2 text-sm">{exp.id}</td>
                    <td className="border px-4 py-2 text-sm">{exp.mass}</td>
                    <td className="border px-4 py-2 text-sm">{exp.height}</td>
                    <td className="border px-4 py-2 text-sm">{exp.theoreticalTime}</td>
                    <td className="border px-4 py-2 text-sm">{exp.actualTime}</td>
                    <td className="border px-4 py-2 text-sm">{exp.velocity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
};

export default GravityExperiment; 