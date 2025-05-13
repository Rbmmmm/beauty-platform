# 🌟 银发美妆智能平台

<div align="center">

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/next.js-15.3.2-black.svg)

</div>

## 📖 项目简介

银发美妆智能平台是一款专为 50-65 岁银发女性群体打造的美妆学习平台。项目采用适老化设计理念，通过 AI 技术、交互式教学和社交功能，为用户提供个性化的美妆学习体验。

### 🎯 目标用户
- 年龄范围：50-65岁
- 使用场景：日常美妆学习、母女互动、社交活动
- 技术水平：对智能设备操作有基本认知

### ✨ 特色功能
- 🤖 AI 智能肤质检测与建议
- 📚 分级美妆课程体系
- 🗣️ 语音交互界面
- 👥 代际互动社交功能
- 🎁 积分奖励系统

## 🛠️ 技术栈

### 核心框架
- React 19.0.0
- Next.js 15.3.2
- TypeScript 5.x

### UI 框架
- Ant Design 5.25.1
- TailwindCSS 4.x

### 状态管理
- Zustand 5.0.4

### 工具库
- Axios 1.9.0（API 请求）
- Chart.js 4.4.9（数据可视化）
- Framer Motion 12.11.0（动画效果）

## 🚀 快速开始

### 环境要求
```bash
node >= 18.0.0
npm >= 9.0.0
```

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/your-username/beauty-platform.git
cd beauty-platform
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问
```
http://localhost:3000
```

## 📁 项目结构

```
beauty-platform/
├── src/
│   ├── app/                      # Next.js 应用页面
│   │   ├── layout.tsx           # 根布局
│   │   ├── page.tsx             # 首页
│   │   ├── course/              # 美妆课堂
│   │   └── profile/             # 个人中心
│   │
│   ├── components/              # 组件目录
│   │   ├── layout/             # 布局组件
│   │   ├── common/             # 通用组件
│   │   ├── home/               # 首页组件
│   │   ├── course/             # 课堂组件
│   │   └── profile/            # 个人中心组件
│   │
│   ├── hooks/                  # 自定义 Hooks
│   ├── store/                  # 状态管理
│   ├── services/              # API 服务
│   ├── styles/               # 样式文件
│   ├── types/               # 类型定义
│   └── utils/              # 工具函数
│
├── public/                # 静态资源
└── tests/                # 测试文件
```

## 📊 开发进度

### 已完成功能
- [x] 项目基础架构搭建
- [x] 路由系统配置
- [x] 首页基础布局
- [x] 底部导航组件
- [x] 远程协助按钮

### 进行中功能
- [ ] 肤质检测功能
- [ ] 课程展示页面
- [ ] 个人中心页面
- [ ] 数据可视化组件

### 待开发功能
- [ ] AI 分析系统
- [ ] 语音搜索功能
- [ ] 社交互动模块
- [ ] 积分系统

## 🎨 设计规范

### 适老化设计原则
- 文字大小：标题≥36px，正文≥24px，按钮≥30px
- 高对比度配色
- 清晰的视觉层级
- 简单的操作路径（≤3步）

### 组件开发规范
- 遵循 React 函数式组件
- 使用 TypeScript 类型声明
- 添加完整的中文注释
- 编写单元测试用例

## 🔧 开发指南

### 分支管理
- main: 主分支，用于生产环境
- develop: 开发分支，用于功能集成
- feature/*: 功能分支，用于单个功能开发
- hotfix/*: 修复分支，用于紧急问题修复

### 提交规范
```
feat: 添加新功能
fix: 修复问题
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 其他修改
```

### 开发流程
1. 从 develop 分支创建功能分支
2. 开发完成后提交 Pull Request
3. 通过代码审查后合并到 develop
4. 定期将 develop 合并到 main

## 📝 贡献指南

1. Fork 本仓库
2. 创建功能分支
3. 提交代码
4. 创建 Pull Request

## 🤝 团队成员

- 产品经理：@PM
- 设计师：@Designer
- 前端开发：@FE-Team
- 后端开发：@BE-Team

## 📄 开源协议

本项目采用 [MIT](LICENSE) 协议开源。

## 📞 联系方式

如有问题或建议，请通过以下方式联系我们：
- Issues: [GitHub Issues](https://github.com/your-username/beauty-platform/issues)
- Email: your-email@example.com

## 🛠️ 常见问题与处理

### 首页卡片轮播无法居中问题

**问题现象：**
- 首页卡片轮播组件（CardCarousel）出现卡片整体偏右、无法视觉居中的情况。

**原因分析：**
- 旧实现采用绝对定位+transform，所有卡片以中心为锚点，只有当前卡片居中，左右卡片通过平移实现，导致整体视觉偏移。
- 多卡片并排时，绝对定位不适合做视觉居中。

**解决方法：**
- 用 flex 布局替代绝对定位，让三张卡片（左、中、右）始终并排居中显示。
- 只渲染当前卡片和左右两侧卡片，其他卡片隐藏，提升性能和美观度。
- 具体实现：
  - 卡片容器使用 `flex items-center justify-center`，每张卡片用 `mx-4` 间距，去掉绝对定位。
  - 只渲染 `[-1, 0, 1]` 三张卡片，通过 `offset` 控制样式和点击切换。
  - 当前卡片 `scale-100 opacity-100 z-20`，左右卡片 `scale-90 opacity-60 z-10`。

**参考代码片段：**
```tsx
<div className="flex items-center justify-center">
  {[-1, 0, 1].map((offset) => {
    const idx = getIndex(current + offset, len);
    let style = offset === 0
      ? 'z-20 scale-100 opacity-100'
      : 'z-10 scale-90 opacity-60';
    return (
      <div
        key={idx}
        className={`transition-all duration-500 rounded-[28px] overflow-hidden mx-4 ${style}`}
        style={{ width: '320px', height: '380px', cursor: offset === 0 ? 'default' : 'pointer' }}
        onClick={() => offset !== 0 && setCurrent(idx)}
      >
        {renderCardContent(items[idx], idx, offset === 0)}
      </div>
    );
  })}
</div>
```

**适用场景：**
- 任何需要多卡片并排视觉居中的轮播、Banner、走马灯等组件。 