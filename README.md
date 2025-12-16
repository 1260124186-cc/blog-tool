# 博客工具

一个简单的博客内容管理工具，支持文档和章节的创建、编辑、删除和预览功能。

## 功能特性

- **文档管理**：创建、删除和选择文档
- **章节管理**：为文档添加、删除和编辑章节
- **内容编辑**：章节内容的实时编辑与预览
- **响应式设计**：支持桌面和移动设备

## 技术栈

- **前端框架**：React 18
- **构建工具**：Vite
- **测试框架**：Playwright
- **样式**：CSS

## 安装与运行

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

服务器将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

### 运行测试

```bash
npm run test
```

## 项目结构

```
blog-tool/
├─ src/
│  ├─ components/
│  │  ├─ DocumentManager.jsx    # 文档管理组件
│  │  └─ ChapterManager.jsx     # 章节管理组件
│  ├─ styles/
│  │  ├─ App.css                # 全局样式
│  │  ├─ DocumentManager.css    # 文档管理样式
│  │  └─ ChapterManager.css     # 章节管理样式
│  ├─ App.jsx                   # 应用根组件
│  └─ main.jsx                  # 应用入口
├─ tests/
│  └─ app.spec.js               # Playwright测试
├─ index.html                   # HTML模板
├─ vite.config.js               # Vite配置
├─ playwright.config.js         # Playwright配置
└─ package.json                 # 项目配置
```

## 使用说明

1. **创建文档**：在左侧输入文档标题，点击「添加」按钮
2. **创建章节**：选择文档后，在右侧输入章节标题，点击「添加章节」按钮
3. **编辑内容**：点击章节的「编辑内容」按钮，输入内容后点击「保存」
4. **删除**：点击文档或章节的「删除」按钮
5. **预览**：编辑完成后自动显示内容预览

## 测试说明

测试使用 Playwright 框架，覆盖以下功能：
- 页面加载
- 文档添加与删除
- 章节添加
- 内容编辑

## License

MIT
