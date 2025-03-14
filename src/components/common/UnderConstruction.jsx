import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Icon from './Icon';
import Button from './Button';

const UnderConstruction = ({ 
  title, 
  description = "我们正在努力开发此页面，很快就能与您见面！", 
  suggestedLinks = [],
  icon = "tools",
  returnPath = "/"
}) => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Card className="p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6">
            <Icon name={icon} size="3xl" />
          </div>
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
          <div className="w-32 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6"></div>
        </div>
        
        {suggestedLinks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">您可以先尝试这些内容：</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestedLinks.map((link, index) => (
                <Link 
                  key={index} 
                  to={link.to} 
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                      <Icon name={link.icon || 'book'} color="blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium">{link.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{link.description}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        <Button 
          as={Link} 
          to={returnPath}
          variant="primary"
        >
          <Icon name="arrow-left" className="mr-2" />
          返回
        </Button>
      </Card>
    </div>
  );
};

export default UnderConstruction; 