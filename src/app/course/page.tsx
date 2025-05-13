"use client";

import React, { useState, useRef } from "react";

const categories = [
  { key: "beginner", label: "新手入门" },
  { key: "family", label: "代际互动" },
  { key: "antiage", label: "高端抗老" },
];

const mockCourses = {
  beginner: [
    { title: "基础底妆教学", desc: "适合初学者的日常底妆技巧", color: "#FFE5E5" },
    { title: "快速画眉入门", desc: "简单易学的画眉方法", color: "#E3F4EA" },
  ],
  family: [
    { title: "母女同妆体验", desc: "和女儿一起变美的亲子时光", color: "#FFF5E5" },
    { title: "家庭聚会妆", desc: "温馨场合的妆容推荐", color: "#E3F4EA" },
  ],
  antiage: [
    { title: "抗老提拉妆", desc: "提升气色，减龄有术", color: "#FFE5E5" },
    { title: "淡化细纹眼妆", desc: "适合熟龄肌的眼部技巧", color: "#FFF5E5" },
  ],
};

export default function CoursePage() {
  const [activeCat, setActiveCat] = useState("beginner");
  const [search, setSearch] = useState("");
  const [suggest, setSuggest] = useState<string[]>([]);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [speechSupported, setSpeechSupported] = useState(true);

  // 检查语音识别支持
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) setSpeechSupported(false);
    }
  }, []);

  // 简单关键词联想
  const handleInput = (val: string) => {
    setSearch(val);
    if (val.includes("户外")) setSuggest(["防水妆"]);
    else if (val.includes("聚会")) setSuggest(["派对妆"]);
    else setSuggest([]);
  };

  // 语音识别
  const handleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setListening(true);
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setSearch(text);
      handleInput(text);
      setListening(false);
    };
    recognition.onerror = () => {
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#FFF5F7] to-[#FFF] px-4 pb-12">
      {/* 标题 */}
      <h1 className="text-[40px] font-extrabold text-[#FF6B81] mb-6 mt-8">美妆课堂</h1>
      {/* 语音搜索栏 */}
      <div className="w-full max-w-2xl flex flex-col items-center mb-8">
        <div className="flex w-full bg-white rounded-full shadow-lg px-6 py-4 items-center gap-4">
          <span className="text-2xl text-[#FF6B81] font-bold">🔍</span>
          <input
            className="flex-1 text-2xl bg-transparent outline-none placeholder:text-gray-400"
            style={{ fontSize: 28 }}
            placeholder={'试试语音搜索：如"教我画遮瑕眼袋的妆"'}
            value={search}
            onChange={e => handleInput(e.target.value)}
          />
          <button
            className={`text-xl px-4 py-2 rounded-full font-bold ml-2 transition-all ${listening ? 'bg-[#FF6B81] text-white' : 'bg-[#FF6B81]/90 text-white hover:bg-[#FF6B81]'}`}
            onClick={handleVoice}
            disabled={!speechSupported || listening}
            aria-label="语音输入"
          >
            {listening ? '正在聆听...' : '语音'}
          </button>
        </div>
        {/* 关键词联想 */}
        {suggest.length > 0 && (
          <div className="w-full mt-2 text-lg text-gray-600">
            关键词推荐：{suggest.map(s => <span key={s} className="inline-block bg-[#FFE5E5] text-[#FF6B81] rounded-full px-4 py-1 mx-1">{s}</span>)}
          </div>
        )}
        {!speechSupported && (
          <div className="w-full mt-2 text-lg text-red-500">当前浏览器不支持语音输入</div>
        )}
      </div>
      {/* 分类导航 */}
      <div className="flex gap-4 mb-8 w-full max-w-2xl justify-center flex-wrap">
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`px-8 py-3 rounded-full text-2xl font-bold border-2 transition-all ${activeCat === cat.key ? 'bg-[#FF6B81] text-white border-[#FF6B81]' : 'bg-white text-[#FF6B81] border-[#FF6B81]/40 hover:bg-[#FF6B81]/10'}`}
            onClick={() => setActiveCat(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      {/* 课程卡片区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {mockCourses[activeCat].map((course, idx) => (
          <div
            key={course.title}
            className="rounded-[28px] shadow-lg flex flex-col md:flex-row items-center p-6 bg-white hover:scale-[1.02] transition-transform cursor-pointer"
          >
            {/* 封面 */}
            <div className="w-40 h-40 rounded-2xl flex-shrink-0 mr-0 md:mr-8 mb-4 md:mb-0" style={{ background: course.color }} />
            {/* 文字内容 */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-2xl font-bold text-[#FF6B81] mb-2">{course.title}</div>
              <div className="text-xl text-gray-600 mb-2">{course.desc}</div>
              <button className="mt-2 px-6 py-2 rounded-full bg-[#FF6B81]/90 text-white text-lg font-bold shadow hover:bg-[#FF6B81] transition-all w-fit">观看视频</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 