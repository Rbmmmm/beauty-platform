import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function RecommendCard() {
  return (
    <Card className="p-6 h-full flex flex-col items-start justify-between bg-gradient-to-br from-[#FFE5E5] to-[#FFF0F0]">
      <div className="w-full">
        <h2 className="text-2xl font-bold text-[#FF6B81] mb-4">今日妆容推荐</h2>
        <div className="flex items-center justify-between text-base mb-3">
          <span className="text-gray-600">今日天气：晴朗 26°C</span>
          <span className="text-[#FF6B81] font-medium">适合外出</span>
        </div>
      </div>

      <div className="w-full bg-white/80 rounded-xl p-4 shadow-md">
        <h4 className="text-xl font-bold text-[#FF6B81] mb-2">清新自然妆</h4>
        <p className="text-gray-600 mb-2">根据您的肤质特点，为您推荐：</p>
        <ul className="space-y-2 text-gray-600 text-base">
          <li className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#FF6B81] mr-2"></span>
            轻薄透气的防晒隔离
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#FF6B81] mr-2"></span>
            水润清透的粉底液
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#FF6B81] mr-2"></span>
            淡雅自然的腮红
          </li>
        </ul>
      </div>

      <Button 
        className="w-full py-3 bg-[#FF6B81]/10 text-[#FF6B81] font-medium hover:bg-[#FF6B81]/20 transition-colors"
        onClick={() => window.location.href = '/course/recommend'}
      >
        查看详细步骤
      </Button>
    </Card>
  );
} 