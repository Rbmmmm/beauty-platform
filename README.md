# 🌟 银发美妆智能平台

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Version](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Next.js Version](https://img.shields.io/badge/Next.js-14.1.0-black.svg)](https://nextjs.org/)
[![Python Version](https://img.shields.io/badge/Python-3.8-blue.svg)](https://www.python.org/)

## 📖 项目简介
银发美妆智能平台是一款专为50-65岁银发女性群体打造的美妆学习平台。项目采用适老化设计理念，通过AI技术、交互式教学和社交功能，为用户提供个性化的美妆学习体验。

## 🛠️ 环境要求

### 必需软件
- Node.js 18.0.0 或更高版本
- Python 3.8 或更高版本
- npm 9.0.0 或更高版本
- Git

### 推荐开发工具
- VS Code
- PyCharm（用于Python开发）
- Chrome 浏览器（用于前端调试）

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone [项目地址]
cd beauty-platform
```

### 2. 前端环境配置

#### 安装 Node.js
1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载并安装 LTS 版本（推荐 18.x）
3. 验证安装：
```bash
node -v  # 应显示 v18.x.x
npm -v   # 应显示 9.x.x
```

#### 安装前端依赖
```bash
# 安装项目依赖
npm install

# 启动开发服务器
npm run dev
```

### 3. 后端环境配置

#### 安装 Python
1. 访问 [Python 官网](https://www.python.org/)
2. 下载并安装 Python 3.8 或更高版本
3. 验证安装：
```bash
python --version  # 应显示 Python 3.8.x 或更高
```

#### 配置后端环境
```bash
# 进入后端目录
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 启动后端服务
python main.py
```

## 📦 依赖说明

### 前端依赖
- Next.js 14.1.0
- React 18.2.0
- TypeScript 5.3.3
- Ant Design 5.15.1
- TailwindCSS 3.4.1
- Zustand 4.5.1
- Axios 1.6.7
- Chart.js 4.4.1

### 后端依赖
- Flask 2.0.0
- Python-dotenv 0.19.0
- Dashscope 1.10.0
- BeautifulSoup4 4.9.3
- Markdown 3.4.0

## 📁 项目结构
```
beauty-platform/
├── src/                    # 前端源代码
│   ├── app/               # Next.js 页面
│   ├── components/        # React 组件
│   └── styles/           # 样式文件
├── backend/               # 后端代码
│   ├── community/        # 社区模块
│   ├── users/           # 用户模块
│   └── beauty_platform/ # 项目配置
├── public/               # 静态资源
└── package.json         # 前端依赖配置
```

## 🔧 常见问题

### 1. 端口占用
如果遇到端口占用问题，可以：
- 前端：修改 `package.json` 中的 `dev` 脚本，添加 `-p 3001`（或其他端口）
- 后端：修改 `main.py` 中的端口配置

### 2. 依赖安装失败
如果遇到依赖安装问题：
- 前端：尝试删除 `node_modules` 文件夹和 `package-lock.json`，重新运行 `npm install`
- 后端：确保使用正确的 Python 版本，并确保虚拟环境已激活

### 3. 环境变量配置
项目需要配置以下环境变量：
- 前端：创建 `.env.local` 文件
- 后端：创建 `.env` 文件

## 📝 注意事项
1. 确保前后端服务同时运行
2. 首次运行需要安装所有依赖
3. 如遇到问题，请查看控制台错误信息
4. 建议使用推荐的开发工具进行开发

