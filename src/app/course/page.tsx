import React from 'react';

export default function CoursePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">美妆课堂</h1>
      <div className="space-y-4">
        {/* 课程分类 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg text-center">
            <h3 className="text-lg">新手入门</h3>
          </div>
          <div className="p-4 bg-white rounded-lg text-center">
            <h3 className="text-lg">代际互动</h3>
          </div>
          <div className="p-4 bg-white rounded-lg text-center">
            <h3 className="text-lg">高端抗老</h3>
          </div>
        </div>

        {/* 课程列表 */}
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-4 rounded-lg">
              <div className="aspect-video bg-gray-200 rounded-lg mb-2"></div>
              <h4 className="text-lg">基础护肤步骤详解</h4>
              <p className="text-gray-500">适合新手的护肤入门课程</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 