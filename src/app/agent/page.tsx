'use client';

import React, { useState } from 'react';
import { VoiceAssistant } from '@/components/common/VoiceAssistant';
import { IoMdSend } from 'react-icons/io';
import { IoArrowBack } from 'react-icons/io5';
import Link from 'next/link';

// 调用API处理用户输入
const processUserInput = async (input: string) => {
  try {
    // 调用API
    const response = await fetch('/api/process', {
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
    
    // 根据不同的意图返回不同的响应
    if (result.intent === 1) {
      return `产品推荐：\n${result.recommendation}`;
    } else if (result.intent === 2) {
      return '请点击首页的"智能肤质检测"功能进行皮肤检测';
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

export default function AgentPage() {
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
      
      // 调用Python函数
      const response = await processUserInput(textInput);
      
      // 添加AI回复
      setMessages(prev => [...prev, { 
        type: 'agent', 
        content: response
      }]);
      
      setTextInput('');
    } finally {
      setIsLoading(false);
    }
  };

  // 处理语音识别结果
  const handleVoiceResult = async (text: string) => {
    try {
      setIsLoading(true);
      // 添加用户语音输入消息
      setMessages(prev => [...prev, { type: 'user', content: text }]);
      
      // 调用Python函数
      const response = await processUserInput(text);
      
      // 添加AI回复
      setMessages(prev => [...prev, { 
        type: 'agent', 
        content: response
      }]);
      
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F7] to-[#FFF]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 返回按钮和标题区域 */}
        <div className="flex items-center mb-8">
          <Link 
            href="/"
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="返回主页"
          >
            <IoArrowBack size={32} className="text-[#FF6B81]" />
          </Link>
          <h1 className="text-4xl font-bold text-[#FF6B81]">
            智能美妆助手
          </h1>
        </div>

        {/* 消息显示区域 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 min-h-[400px] max-h-[600px] overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p className="text-2xl mb-4">👋 您好！</p>
              <p className="text-xl">我是您的智能美妆助手，可以为您：</p>
              <div className="mt-6 space-y-4 text-lg">
                <p>🎯 推荐适合的美妆产品</p>
                <p>💄 推荐个性化妆容方案</p>
                <p>💰 比较产品价格</p>
                <p>📝 进行肤质检测</p>
              </div>
              <p className="mt-8 text-xl">请试试对我说：</p>
              <div className="mt-4 space-y-2">
                <p className="text-[#FF6B81]">"推荐一款适合干皮的面霜"</p>
                <p className="text-[#FF6B81]">"教我画适合上班的淡妆"</p>
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
                    ? 'bg-[#FF6B81] text-white'
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
              className="flex-1 text-2xl p-4 rounded-xl border-2 border-gray-200 focus:border-[#FF6B81] focus:outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
            />
            <button
              onClick={handleTextSubmit}
              disabled={isLoading || !textInput.trim()}
              className={`px-6 rounded-xl ${
                isLoading || !textInput.trim()
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#FF6B81] hover:bg-[#FF8296]'
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