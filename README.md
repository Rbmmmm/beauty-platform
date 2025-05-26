# 🌟 银发美妆智能平台

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Version](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Next.js Version](https://img.shields.io/badge/Next.js-15.3.2-black.svg)](https://nextjs.org/)
[![Python Version](https://img.shields.io/badge/Python-3.x-blue.svg)](https://www.python.org/)
[![Django Version](https://img.shields.io/badge/Django-4.x-green.svg)](https://www.djangoproject.com/)

银发美妆智能平台是一款专为 50-65 岁银发女性群体打造的美妆学习平台。项目采用适老化设计理念，通过 AI 技术、交互式教学和社交功能，为用户提供个性化的美妆学习体验。

## 📚 目录

- [🌟 银发美妆智能平台](#-银发美妆智能平台)
  - [📚 目录](#-目录)
  - [📖 项目简介](#-项目简介)
    - [🎯 目标用户](#-目标用户)
    - [✨ 特色功能](#-特色功能)
  - [🛠️ 技术栈](#️-技术栈)
    - [后端 (Backend)](#后端-backend)
    - [前端 (Frontend)](#前端-frontend)
    - [UI 框架](#ui-框架)
    - [状态管理](#状态管理)
    - [工具库](#工具库)
  - [🚀 快速开始](#-快速开始)
    - [环境要求](#环境要求)
    - [后端安装与启动](#后端安装与启动)
    - [前端安装与启动](#前端安装与启动)
  - [📁 项目结构](#-项目结构)
  - [✨ 项目截图/演示 (建议添加)](#-项目截图演示-建议添加)
  - [📊 开发进度](#-开发进度)
    - [已完成功能](#已完成功能)
    - [进行中功能](#进行中功能)
    - [待开发功能](#待开发功能)
  - [🎨 设计规范](#-设计规范)
    - [适老化设计原则](#适老化设计原则)
    - [组件开发规范](#组件开发规范)
  - [🔧 开发指南](#-开发指南)
    - [分支管理](#分支管理)
    - [提交规范](#提交规范)
    - [开发流程](#开发流程)
  - [📝 贡献指南](#-贡献指南)
  - [🤝 团队成员](#-团队成员)
  - [📄 开源协议](#-开源协议)
  - [📞 联系方式](#-联系方式)
  - [💡 常见问题与处理](#-常见问题与处理)
    - [首页卡片轮播无法居中问题](#首页卡片轮播无法居中问题)

## 📖 项目简介

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

### 后端 (Backend)
- Python 3.x
- Django 4.x (具体版本请参照 `backend/requirements.txt`)
- Django REST framework

### 前端 (Frontend)
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
- Node.js >= 18.0.0
- npm >= 9.0.0
- Python >= 3.8 (建议使用虚拟环境)
- Pip

### 后端安装与启动

1.  **进入后端目录**
    ```bash
    cd backend
    ```

2.  **创建并激活虚拟环境 (推荐)**
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # macOS/Linux
    source venv/bin/activate
    ```

3.  **安装依赖**
    ```bash
    pip install -r requirements.txt
    ```

4.  **数据库迁移**
    ```bash
    python manage.py migrate
    ```

5.  **创建超级用户 (可选)**
    ```bash
    python manage.py createsuperuser
    ```

6.  **启动开发服务器** (默认运行在 `http://127.0.0.1:8000/`)
    ```bash
    python manage.py runserver
    ```

### 前端安装与启动

1.  **进入项目根目录 (如果当前在 `backend` 目录，请先返回上级)**
    ```bash
    # 如果在 backend 目录:
    # cd ..
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **启动开发服务器** (默认运行在 `http://localhost:3000/`)
    ```bash
    npm run dev
    ```

4.  **构建生产版本**
    ```bash
    npm run build
    ```

## 📁 项目结构

```
beauty-platform/
├── backend/                      # 后端 Django 项目
│   ├── beauty_platform/          # 项目配置
│   │   ├── settings.py
│   │   └── urls.py
│   ├── community/                # 社区模块 App
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── users/                    # 用户模块 App
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── media/                    # 用户上传的媒体文件
│   ├── manage.py                 # Django 管理脚本
│   └── requirements.txt          # 后端依赖
│
├── public/                       # Next.js 静态资源目录
│   ├── next.svg
│   └── vercel.svg
│
├── src/                          # 前端 Next.js 应用
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # 根布局
│   │   ├── page.tsx              # 首页
│   │   ├── auth/                 # 认证页面 (登录、注册)
│   │   ├── community/            # 社区模块页面
│   │   ├── course/               # 美妆课堂页面
│   │   ├── profile/              # 个人中心页面
│   │   └── skin/                 # 肤质检测页面
│   │
│   ├── components/               # React 组件
│   │   ├── common/               # 通用组件
│   │   ├── features/             # 特定功能组件 (如社区、课程)
│   │   └── layout/               # 布局组件
│   │
│   ├── config/                   # 配置文件 (如 env.ts)
│   ├── constants/                # 常量
│   ├── hooks/                    # 自定义 Hooks
│   ├── layouts/                  # 布局组件 (如果与 components/layout 不同)
│   ├── services/                 # API 服务调用
│   ├── store/                    # 状态管理 (Zustand)
│   ├── styles/                   # 全局样式和主题
│   ├── types/                    # TypeScript 类型定义
│   └── utils/                    # 工具函数
│
├── .eslintrc.json                # ESLint 配置文件
├── .gitignore                    # Git 忽略文件配置
├── next.config.js                # Next.js 配置文件
├── package.json                  # 项目依赖和脚本
├── postcss.config.js             # PostCSS 配置文件
├── README.md                     # 项目说明文件
├── tailwind.config.js            # TailwindCSS 配置文件
└── tsconfig.json                 # TypeScript 配置文件
```

## ✨ 项目截图/演示 (建议添加)

建议在此处添加一些项目界面的截图或 GIF 动态演示，以便更直观地展示项目功能和用户体验。

例如：
- 首页截图
- AI 肤质检测流程演示
- 美妆课程列表截图
- 社区互动界面截图

## 📊 开发进度

### 已完成功能
- [x] 项目基础架构搭建 (前后端)
- [x] 路由系统配置 (前后端)
- [x] 首页基础布局
- [x] 底部导航组件
- [x] 远程协助按钮

### 进行中功能
- [ ] 肤质检测功能
- [ ] 课程展示页面
- [ ] 个人中心页面
- [ ] 数据可视化组件
- [ ] 后端用户认证接口
- [ ] 后端社区帖子接口

### 待开发功能
- [ ] AI 分析系统集成
- [ ] 语音搜索功能
- [ ] 社交互动模块 (评论、点赞等)
- [ ] 积分系统
- [ ] 完整的课程内容上传与管理

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
- `main`: 主分支，用于生产环境部署。
- `develop`: 开发分支，用于日常开发和功能集成。所有功能分支从此分支创建，并合并回此分支。
- `feature/<feature-name>`: 功能分支，用于开发新功能。例如: `feature/user-authentication`。
- `fix/<fix-name>`: Bug 修复分支。例如: `fix/login-button-style`。
- `hotfix/<hotfix-name>`: 紧急线上 Bug 修复分支，直接从 `main` 分支创建，修复后合并回 `main` 和 `develop`。

### 提交规范
推荐使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。
```
type(scope): subject

body (optional)

footer (optional)
```
示例:
```
feat(auth): add user registration endpoint
fix(ui): correct button alignment on profile page
docs(readme): update installation instructions
style(lint): apply prettier formatting
refactor(api): improve error handling in post service
test(auth): add unit tests for login component
chore(deps): update axios to version 1.9.0
```
主要 `type` 包括:
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档变更
- `style`: 代码风格调整 (不影响代码逻辑)
- `refactor`: 代码重构 (既不是新功能也不是 Bug 修复)
- `perf`: 性能优化
- `test`: 添加或修改测试
- `build`:影响构建系统或外部依赖项的更改（示例范围：gulp，broccoli，npm）
- `ci`: 对CI配置文件和脚本的更改（示例范围：Travis，Circle，BrowserStack，SauceLabs）
- `chore`: 其他不修改 `src` 或 `test` 文件的更改 (如构建脚本、依赖管理)
- `revert`: 撤销之前的提交

### 开发流程
1.  确保本地 `develop` 分支为最新代码: `git checkout develop` && `git pull origin develop`。
2.  从 `develop` 分支创建新的功能分支: `git checkout -b feature/your-feature-name`。
3.  进行功能开发，并按照提交规范进行代码提交。
4.  功能开发完成后，将本地功能分支推送到远程: `git push origin feature/your-feature-name`。
5.  在代码托管平台 (如 GitHub, GitLab) 上创建 Pull Request (PR) / Merge Request (MR)，目标分支为 `develop`。
6.  至少需要一名其他团队成员进行代码审查 (Code Review)。
7.  代码审查通过后，将功能分支合并到 `develop` 分支。
8.  定期将 `develop` 分支的稳定代码合并到 `main` 分支进行发布。

## 📝 贡献指南

我们欢迎各种形式的贡献！如果您想为本项目做出贡献，请遵循以下步骤：

1.  **Fork 本仓库** 到您的 GitHub 账户。
2.  将您 Fork 的仓库 **克隆到本地**:
    ```bash
    git clone https://github.com/your-username/beauty-platform.git
    cd beauty-platform
    ```
3.  **创建您的功能分支**:
    ```bash
    git checkout -b feature/your-amazing-feature develop
    ```
    (请确保从最新的 `develop` 分支创建)
4.  **进行代码修改和提交**:
    ```bash
    git commit -m "feat(scope): add some amazing feature"
    ```
5.  **将您的分支推送到您的 Fork 仓库**:
    ```bash
    git push origin feature/your-amazing-feature
    ```
6.  **创建 Pull Request**: 打开您 Fork 的仓库页面，点击 "New pull request"，选择将您的 `feature/your-amazing-feature` 分支合并到原仓库的 `develop` 分支。请在 PR 中详细描述您的更改。

在提交代码前，请确保：
- 代码符合项目编码规范。
- 相关文档已更新。
- 已添加必要的测试用例。

## 🤝 团队成员

（请在此处列出实际的团队成员和他们的职责或 GitHub 用户名）

-   产品经理：`@PM_Username`
-   UI/UX 设计师：`@Designer_Username`
-   前端开发团队：`@FrontendDev1_Username`, `@FrontendDev2_Username`
-   后端开发团队：`@BackendDev1_Username`, `@BackendDev2_Username`
-   测试工程师：`@Tester_Username`

## 📄 开源协议

本项目采用 [MIT](LICENSE) 协议开源。请查阅 `LICENSE` 文件获取更多信息。
(如果项目中没有 `LICENSE` 文件，建议添加一个。您可以从 [choosealicense.com](https://choosealicense.com/licenses/mit/) 获取 MIT 许可证模板。)

## 📞 联系方式

如在项目使用或开发过程中遇到任何问题，或有任何建议，欢迎通过以下方式联系我们：

-   **GitHub Issues**: [https://github.com/your-username/beauty-platform/issues](https://github.com/your-username/beauty-platform/issues) (推荐，便于追踪和公开讨论)
-   **Email**: `your-project-email@example.com` (请替换为项目专用邮箱)

## 💡 常见问题与处理

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