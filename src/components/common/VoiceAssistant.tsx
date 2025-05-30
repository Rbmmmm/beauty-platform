import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { MdMic, MdMicOff } from 'react-icons/md';

interface VoiceAssistantProps {
  onAiResponse: (text: string) => Promise<string>;
  className?: string;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ 
  onAiResponse,
  className = '' 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // 检查语音识别支持
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) setSpeechSupported(false);
    }
  }, []);

  const handleVoiceCommand = useCallback(async () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback('您的浏览器不支持语音识别功能');
      return;
    }

    try {
      if (isListening) {
        // 停止录音
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          recognitionRef.current = null;
        }
        setIsListening(false);
      } else {
        // 开始录音
        const recognition = new SpeechRecognition();
        recognition.lang = 'zh-CN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = async (event: any) => {
          const text = event.results[0][0].transcript;
          setIsProcessing(true);
          try {
            const response = await onAiResponse(text);
            setFeedback(response);
          } catch (err) {
            console.error('AI处理错误:', err);
            setFeedback('抱歉，处理您的语音时出现了问题，请重试');
          } finally {
            setIsProcessing(false);
            setIsListening(false);
          }
        };

        recognition.onerror = (event: any) => {
          console.error('语音识别错误:', event.error);
          setFeedback('语音识别出错，请重试');
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        recognitionRef.current = recognition;
        setIsListening(true);
        setFeedback('');
      }
    } catch (err) {
      console.error('语音处理错误:', err);
      setFeedback('抱歉，处理您的语音时出现了问题，请重试');
      setIsListening(false);
    }
  }, [isListening, onAiResponse]);

  return (
    <div className={`voice-assistant ${className}`}>
      <button
        onClick={handleVoiceCommand}
        disabled={isProcessing || !speechSupported}
        className={`
          flex items-center justify-center
          w-16 h-16 rounded-full
          text-2xl
          transition-all duration-300
          ${isListening 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-[#FF6B81] hover:bg-[#FF8296]'
          }
          ${(isProcessing || !speechSupported) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          text-white
          shadow-lg
          focus:outline-none
          focus:ring-4
          focus:ring-[#FFB3BE]
        `}
        aria-label={isListening ? '停止录音' : '开始录音'}
      >
        {isListening ? <MdMicOff size={32} /> : <MdMic size={32} />}
      </button>

      <div className="mt-4 text-center">
        <p className="text-xl font-medium">
          {isProcessing ? '正在处理...' : 
           isListening ? '正在聆听...' : 
           '点击按钮开始说话'}
        </p>
      </div>

      {!speechSupported && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-lg">
          当前浏览器不支持语音输入
        </div>
      )}

      {feedback && (
        <div className="mt-4 p-6 bg-gray-100 rounded-lg">
          <p className="text-xl leading-relaxed">{feedback}</p>
        </div>
      )}
    </div>
  );
}; 