'use client';

import React, { useState } from 'react';
import { VoiceAssistant } from '@/components/common/VoiceAssistant';
import { IoMdSend } from 'react-icons/io';
import { IoArrowBack } from 'react-icons/io5';
import Link from 'next/link';

// 调用API处理用户输入
const processUserInput = async (input: string) => {
  try {
    // 调用新的护肤处理API
    const response = await fetch('/api/skincare-process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      throw new Error('API请求失败');
    }

    const result = await response.json();
    
    if (result.status === 'error') {
      throw new Error(result.message || '处理请求时出错');
    }
    
    // 根据不同的意图返回不同的响应 (这里可能需要根据护肤助手的实际后端返回调整)
    // 暂时沿用 agent.py 的意图处理逻辑作为示例
    if (result.intent === 1) {
      return `产品推荐：\n${result.recommendation}`;
    } else if (result.intent === 2) {
      // 假设意图2在agent.py中会返回护肤建议 (虽然目前只返回引导信息)
      // 在实际集成中，需要后端根据用户的详细护肤档案和天气生成具体建议并返回
      return result.recommendation || '正在为您生成护肤建议...';
    } else if (result.intent === 3) {
      return "正在为您比较相关产品的价格...";
    } else if (result.intent === 4) {
      return `妆容推荐：\n${result.recommendation}`;
    } else {
      return "抱歉，我暂时无法理解您的需求，请换个方式描述";
    }
  } catch (error) {
    console.error('处理错误:', error);
    return "抱歉，处理您的请求时出现了问题，请稍后再试";
  }
};

export default function SkincareAgentPage() {
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<Array<{type: 'user' | 'agent', content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 处理文本输入提交
  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;
    
    try {
      setIsLoading(true);
      // 添加用户消息
      setMessages(prev => [...prev, { type: 'user', content: textInput }]);
      
      // 调用API获取响应
      const response = await processUserInput(textInput);
      
      // 添加AI回复
      setMessages(prev => [...prev, { 
        type: 'agent', 
        content: response
      }]);
      
    } finally {
      setIsLoading(false);
      // 清空输入框
      setTextInput('');
    }
  };

  // 处理语音识别结果
  const handleVoiceResult = async (text: string) => {
    try {
      setIsLoading(true);
      // 添加用户语音输入消息
      setMessages(prev => [...prev, { type: 'user', content: text }]);
      
      // 调用API获取响应
      const response = await processUserInput(text);
      
      // 添加AI回复
      setMessages(prev => [...prev, { 
        type: 'agent', 
        content: response
      }]);
      
      return response; // 返回响应给 VoiceAssistant 组件
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F4EA] to-[#FFF]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 返回按钮和标题区域 */}
        <div className="flex items-center mb-8">
          <Link 
            href="/"
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="返回主页"
          >
            <IoArrowBack size={32} className="text-[#4CAF50]" />
          </Link>
          <h1 className="text-4xl font-bold text-[#4CAF50]">
            智能护肤助手
          </h1>
        </div>

        {/* 消息显示区域 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 min-h-[400px] max-h-[600px] overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p className="text-2xl mb-4">👋 您好！</p>
              <p className="text-xl">我是您的智能护肤助手，可以根据天气和您的肤质提供每日建议。</p>
              <div className="mt-6 space-y-4 text-lg">
                <p>🎯 获取今日护肤建议</p>
                <p>📝 了解更多护肤知识</p>
              </div>
              <p className="mt-8 text-xl">您可以问：</p>
              <div className="mt-4 space-y-2">
                <p className="text-[#4CAF50]">"今天的护肤建议"</p>
                <p className="text-[#4CAF50]">"干性皮肤怎么保湿？"</p>
              </div>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                  message.type === 'user'
                    ? 'bg-[#4CAF50] text-white' // 调整用户气泡颜色
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-xl leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 rounded-2xl px-6 py-4">
                <p className="text-xl text-gray-600">正在思考...</p>
              </div>
            </div>
          )}
        </div>

        {/* 输入区域 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* 文本输入 */}
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="输入您的问题..."
              className="flex-1 text-2xl p-4 rounded-xl border-2 border-gray-200 focus:border-[#4CAF50] focus:outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
            />
            <button
              onClick={handleTextSubmit}
              disabled={isLoading || !textInput.trim()}
              className={`px-6 rounded-xl ${
                isLoading || !textInput.trim()
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#4CAF50] hover:bg-[#66BB6A]'
              } text-white transition-colors`}
            >
              <IoMdSend size={32} />
            </button>
          </div>

          {/* 语音输入 */}
          <div className="flex justify-center">
            <VoiceAssistant
              onAiResponse={handleVoiceResult}
              className="flex flex-col items-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 