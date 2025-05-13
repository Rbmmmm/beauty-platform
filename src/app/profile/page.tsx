import React from 'react';
import { Card, Button } from 'antd';

export default function ProfilePage() {
  return (
    <div className="p-4 space-y-4">
      {/* 用户信息 */}
      <div className="bg-white p-4 rounded-lg flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div>
          <h2 className="text-xl font-bold">时尚奶奶</h2>
          <p className="text-gray-500">加入 30 天</p>
        </div>
      </div>

      {/* 数据统计 */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <h4 className="text-lg font-bold">28</h4>
          <p className="text-gray-500">肌肤年龄</p>
        </Card>
        <Card className="text-center">
          <h4 className="text-lg font-bold">12h</h4>
          <p className="text-gray-500">学习时长</p>
        </Card>
        <Card className="text-center">
          <h4 className="text-lg font-bold">23</h4>
          <p className="text-gray-500">互动次数</p>
        </Card>
      </div>

      {/* 权益入口 */}
      <div className="space-y-4">
        <Card title="我的权益">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>优雅值积分</span>
              <span className="text-primary">1280</span>
            </div>
            <div className="flex justify-between items-center">
              <span>积分兑换</span>
              <span className="text-gray-500">{'>'}</span>
            </div>
          </div>
        </Card>

        <Button type="primary" block size="large">
          线下沙龙报名
        </Button>
      </div>
    </div>
  );
} 