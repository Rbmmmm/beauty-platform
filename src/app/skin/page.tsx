"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

export default function SkinTestPage() {
  const [step, setStep] = useState<'camera'|'analyzing'|'result'>("camera");
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 打开摄像头
  useEffect(() => {
    if (step !== 'camera') return;
    setError(null);
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        }
      } catch (e) {
        setError('无法访问摄像头，请检查权限设置');
      }
    }
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [step]);

  // 拍照
  const handleTakePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setPhoto(canvas.toDataURL('image/jpeg'));
    }
    setStep("analyzing");
    setTimeout(() => {
      setStep("result");
    }, 1800);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFF5F7] to-[#FFF] px-4 relative">
      {/* 左上角返回按钮 */}
      <Link href="/" className="absolute left-4 top-4 z-50">
        <button className="flex items-center px-4 py-2 rounded-full bg-white/90 text-[#FF6B81] text-xl font-bold shadow hover:bg-[#FF6B81]/10 border border-[#FF6B81]/20 transition-all">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          返回首页
        </button>
      </Link>
      <h1 className="text-[40px] font-extrabold text-[#FF6B81] mb-6 mt-8">智能肤质检测</h1>
      {step === "camera" && (
        <>
          <div className="relative w-[340px] h-[340px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mb-8 shadow-xl">
            {/* 摄像头取景区 */}
            {error ? (
              <span className="text-2xl text-red-400 text-center px-4">{error}</span>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                style={{ background: '#eee' }}
              />
            )}
            {/* 圆形遮罩边框 */}
            <div className="absolute inset-0 border-4 border-[#FF6B81]/60 pointer-events-none rounded-full" />
          </div>
          <div className="text-xl text-gray-700 mb-8">请将面部对准圆圈，光线充足时点击下方按钮</div>
          <button
            className="w-32 h-32 rounded-full bg-[#FF6B81] flex flex-col items-center justify-center text-white text-2xl font-bold shadow-lg hover:scale-105 transition-transform mb-8 border-8 border-white"
            onClick={handleTakePhoto}
            aria-label="拍照检测"
            disabled={!!error}
          >
            拍照检测
          </button>
        </>
      )}
      {step === "analyzing" && (
        <div className="flex flex-col items-center justify-center">
          <div className="w-[120px] h-[120px] rounded-full border-8 border-[#FF6B81]/30 flex items-center justify-center mb-8 animate-spin-slow">
            <div className="w-16 h-16 rounded-full bg-[#FF6B81]/60" />
          </div>
          <div className="text-2xl text-[#FF6B81] font-bold mb-2">AI分析中…</div>
          <div className="text-lg text-gray-500">请稍候，正在为您分析肤质</div>
        </div>
      )}
      {step === "result" && (
        <div className="flex flex-col items-center justify-center">
          <div className="w-[180px] h-[180px] rounded-full overflow-hidden bg-gray-100 mb-6 shadow-lg flex items-center justify-center">
            {/* 检测结果图片 */}
            {photo ? (
              <img src={photo} alt="检测结果" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl text-gray-400">照片</span>
            )}
          </div>
          <div className="text-2xl font-bold text-[#FF6B81] mb-2">肤质分析结果</div>
          <div className="text-lg text-gray-700 mb-4">水油平衡良好，细腻度高，建议使用保湿型护肤品。</div>
          <button
            className="mt-4 px-8 py-3 rounded-full bg-[#FF6B81] text-white text-xl font-bold shadow-md hover:scale-105 transition-transform"
            onClick={() => setStep("camera")}
          >
            再测一次
          </button>
        </div>
      )}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 1.6s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
} 