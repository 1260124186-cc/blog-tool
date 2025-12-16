import React, { useState, useEffect } from 'react';
import '../styles/DocumentManager.css';
import ChapterManager from './ChapterManager';

const STORAGE_KEY = 'blog-tool-documents';

// 文档搜索栏组件（内联）
const DocumentSearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  // 实时搜索功能
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(keyword.trim(), 'all');
    }, 300); // 防抖处理，300ms延迟

    return () => clearTimeout(timer);
  }, [keyword, onSearch]);

  const handleClear = () => {
    setKeyword('');
    onSearch('', 'all');
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="输入文档名称"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            aria-label="搜索输入框"
          />
          <div className="search-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#909399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 14L11.1 11.1" stroke="#909399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {keyword && (
            <button
              type="button"
              className="clear-btn"
              onClick={handleClear}
              aria-label="清空搜索"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// 确认对话框组件（内联）
const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = '确认', cancelText = '取消' }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="confirm-dialog-backdrop" onClick={handleBackdropClick}>
      <div className="confirm-dialog-container" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-dialog-header">
          <h3>{title || '确认操作'}</h3>
        </div>
        <div className="confirm-dialog-body">
          <p>{message || '确定要执行此操作吗？'}</p>
        </div>
        <div className="confirm-dialog-actions">
          <button type="button" className="confirm-dialog-btn confirm-dialog-btn-cancel" onClick={onClose}>
            {cancelText}
          </button>
          <button type="button" className="confirm-dialog-btn confirm-dialog-btn-confirm" onClick={() => { onConfirm(); onClose(); }}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// 文档弹窗组件（内联）
const DocumentModal = ({ isOpen, onClose, onSave, document = null }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (document) {
        setTitle(document.title || '');
      } else {
        setTitle('');
      }
      setError('');
    }
  }, [isOpen, document]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('请输入文档标题');
      return;
    }

    if (trimmedTitle.length > 100) {
      setError('文档标题不能超过100个字符');
      return;
    }

    onSave(trimmedTitle);
    setTitle('');
    setError('');
    onClose();
  };

  const handleCancel = () => {
    setTitle('');
    setError('');
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{document ? '编辑文档' : '添加文档'}</h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleCancel}
            aria-label="关闭弹窗"
          >
            ×
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label htmlFor="doc-title-input">文档标题</label>
            <input
              id="doc-title-input"
              type="text"
              placeholder="请输入文档标题"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              autoFocus
              maxLength={100}
              aria-label="文档标题输入框"
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'title-error' : undefined}
            />
            {error && (
              <span id="title-error" className="modal-error" role="alert">
                {error}
              </span>
            )}
            <div className="modal-char-count">
              {title.length}/100
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="modal-btn modal-btn-cancel"
              onClick={handleCancel}
            >
              取消
            </button>
            <button
              type="submit"
              className="modal-btn modal-btn-submit"
            >
              {document ? '保存' : '创建'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 默认文档数据
const getDefaultDocuments = () => {
  const now = Date.now();
  return [
    {
      id: now,
      title: 'React Hooks 深度解析',
      chapters: [
        {
          id: now + 1,
          title: '引言',
          content: 'React Hooks 是 React 16.8 引入的新特性，它允许我们在函数组件中使用状态和其他 React 特性。本文将深入探讨 Hooks 的原理、使用场景以及最佳实践。\n\n通过本文的学习，你将掌握：\n- useState 和 useEffect 的核心用法\n- 自定义 Hooks 的设计模式\n- 性能优化的技巧'
        },
        {
          id: now + 2,
          title: 'useState 详解',
          content: 'useState 是最基础的 Hook，用于在函数组件中添加状态管理。\n\n基本用法：\n```javascript\nconst [count, setCount] = useState(0);\n```\n\nuseState 返回一个数组，第一个元素是当前状态值，第二个元素是更新状态的函数。\n\n注意事项：\n1. 状态更新是异步的\n2. 函数式更新可以避免闭包陷阱\n3. 初始值可以是函数，用于延迟计算'
        },
        {
          id: now + 3,
          title: 'useEffect 的使用',
          content: 'useEffect 用于处理副作用，相当于类组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 的组合。\n\n常见使用场景：\n- 数据获取\n- 订阅事件\n- 手动修改 DOM\n- 清理资源\n\n依赖数组的作用：\n- 空数组 []：只在组件挂载时执行\n- 有依赖项：依赖项变化时执行\n- 无依赖数组：每次渲染都执行'
        },
        {
          id: now + 4,
          title: '自定义 Hooks',
          content: '自定义 Hooks 是一种复用状态逻辑的方式。它本质上是一个函数，名称以 "use" 开头，可以调用其他 Hooks。\n\n示例：\n```javascript\nfunction useCounter(initialValue) {\n  const [count, setCount] = useState(initialValue);\n  const increment = () => setCount(c => c + 1);\n  const decrement = () => setCount(c => c - 1);\n  return { count, increment, decrement };\n}\n```\n\n自定义 Hooks 让组件逻辑更加清晰，便于测试和复用。'
        }
      ]
    },
    {
      id: now + 10000,
      title: '前端性能优化实战',
      chapters: [
        {
          id: now + 10001,
          title: '性能优化的意义',
          content: '在当今快节奏的互联网时代，网站性能直接影响用户体验和业务指标。研究表明，页面加载时间每增加 1 秒，转化率就会下降 7%。\n\n性能优化的目标：\n- 减少首屏加载时间\n- 提升交互响应速度\n- 降低资源消耗\n- 改善用户体验'
        },
        {
          id: now + 10002,
          title: '代码分割与懒加载',
          content: '代码分割是减少初始包大小的有效方法。通过动态导入，可以将代码拆分成多个小块，按需加载。\n\nReact 中的实现：\n```javascript\nconst LazyComponent = React.lazy(() => import(\'./LazyComponent\'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      <LazyComponent />\n    </Suspense>\n  );\n}\n```\n\n最佳实践：\n- 路由级别的代码分割\n- 组件级别的懒加载\n- 第三方库的按需引入'
        },
        {
          id: now + 10003,
          title: '图片优化策略',
          content: '图片通常是网页中最大的资源，优化图片可以显著提升加载速度。\n\n优化方法：\n1. 选择合适的图片格式（WebP、AVIF）\n2. 使用响应式图片（srcset）\n3. 图片懒加载（Intersection Observer）\n4. CDN 加速\n5. 图片压缩\n\n工具推荐：\n- ImageOptim（Mac）\n- TinyPNG（在线）\n- Sharp（Node.js）'
        }
      ]
    },
    {
      id: now + 20000,
      title: 'TypeScript 进阶技巧',
      chapters: [
        {
          id: now + 20001,
          title: '泛型编程',
          content: 'TypeScript 的泛型提供了创建可重用组件的强大方式。泛型允许我们编写可以处理多种类型的代码，而不是单一类型。\n\n基础示例：\n```typescript\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n\nlet output = identity<string>("myString");\n```\n\n泛型约束：\n```typescript\ninterface Lengthwise {\n  length: number;\n}\n\nfunction loggingIdentity<T extends Lengthwise>(arg: T): T {\n  console.log(arg.length);\n  return arg;\n}\n```'
        },
        {
          id: now + 20002,
          title: '类型推断与类型守卫',
          content: 'TypeScript 的类型推断可以自动推导出变量的类型，减少显式类型注解的需要。\n\n类型守卫用于缩小类型范围：\n```typescript\nfunction isString(value: unknown): value is string {\n  return typeof value === "string";\n}\n\nfunction processValue(value: unknown) {\n  if (isString(value)) {\n    // 这里 value 的类型被缩小为 string\n    console.log(value.toUpperCase());\n  }\n}\n```\n\n常见的类型守卫：\n- typeof\n- instanceof\n- in 操作符\n- 自定义类型守卫'
        }
      ]
    }
  ];
};

const DocumentManager = ({ previewMode: externalPreviewMode, onPreviewChange, searchKeyword = '', searchType = 'all', onSearch }) => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [previewMode, setPreviewMode] = useState(externalPreviewMode || false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, docId: null, docTitle: '' });

  // 同步外部预览模式
  useEffect(() => {
    if (externalPreviewMode !== undefined) {
      setPreviewMode(externalPreviewMode);
    }
  }, [externalPreviewMode]);

  // 从localStorage加载数据，如果没有则使用默认数据
  useEffect(() => {
    const savedDocuments = localStorage.getItem(STORAGE_KEY);
    let docsToLoad = [];

    if (savedDocuments !== null) {
      // localStorage中存在key（即使是空数组）
      try {
        const parsed = JSON.parse(savedDocuments);
        if (Array.isArray(parsed)) {
          // 如果数据为空，使用默认数据；否则使用保存的数据
          if (parsed.length > 0) {
            docsToLoad = parsed;
          } else {
            // 数据为空，加载默认数据
            docsToLoad = getDefaultDocuments();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(docsToLoad));
            localStorage.setItem('blog-tool-initialized', 'true');
          }
        } else {
          docsToLoad = getDefaultDocuments();
          localStorage.setItem(STORAGE_KEY, JSON.stringify(docsToLoad));
          localStorage.setItem('blog-tool-initialized', 'true');
        }
      } catch (error) {
        console.error('加载数据失败:', error);
        // 如果解析失败，使用默认数据
        docsToLoad = getDefaultDocuments();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(docsToLoad));
        localStorage.setItem('blog-tool-initialized', 'true');
      }
    } else {
      // 如果没有保存的数据，使用默认数据
      docsToLoad = getDefaultDocuments();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(docsToLoad));
      localStorage.setItem('blog-tool-initialized', 'true');
    }

    setDocuments(docsToLoad);

    // 如果有保存的选中文档ID，尝试恢复选中状态
    const savedSelectedId = localStorage.getItem('blog-tool-selected-doc-id');
    if (savedSelectedId) {
      const doc = docsToLoad.find(d => d.id === parseInt(savedSelectedId));
      if (doc) {
        setSelectedDoc(doc);
      } else {
        // 如果保存的ID不存在，选中第一个文档
        if (docsToLoad.length > 0) {
          setSelectedDoc(docsToLoad[0]);
        }
      }
    } else {
      // 如果没有保存的选中状态，选中第一个文档
      if (docsToLoad.length > 0) {
        setSelectedDoc(docsToLoad[0]);
      }
    }
  }, []);

  // 保存数据到localStorage
  useEffect(() => {
    // 始终保存数据，即使是空数组
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    // 标记已初始化，确保空数组不会被默认数据覆盖
    localStorage.setItem('blog-tool-initialized', 'true');
  }, [documents]);

  // 保存选中的文档ID
  useEffect(() => {
    if (selectedDoc) {
      localStorage.setItem('blog-tool-selected-doc-id', selectedDoc.id.toString());
    } else {
      localStorage.removeItem('blog-tool-selected-doc-id');
    }
  }, [selectedDoc]);

  // 搜索过滤文档（只按文档名称搜索）
  useEffect(() => {
    if (!searchKeyword.trim()) {
      setFilteredDocuments(documents);
      return;
    }

    const keyword = searchKeyword.toLowerCase();
    const filtered = documents.filter(doc => {
      // 只搜索文档标题
      return doc.title.toLowerCase().includes(keyword);
    });

    setFilteredDocuments(filtered);
  }, [searchKeyword, documents]);

  const handleOpenAddModal = () => {
    setEditingDoc(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (doc, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setEditingDoc(doc);
    setIsModalOpen(true);
  };

  const handleSaveDocument = (title) => {
    if (editingDoc) {
      // 编辑现有文档
      const updatedDoc = {
        ...editingDoc,
        title: title
      };
      const updatedDocuments = documents.map(doc =>
        doc.id === updatedDoc.id ? updatedDoc : doc
      );
      setDocuments(updatedDocuments);

      // 如果正在编辑选中的文档，更新选中状态
      if (selectedDoc?.id === updatedDoc.id) {
        setSelectedDoc(updatedDoc);
      }
    } else {
      // 添加新文档
    const newDoc = {
      id: Date.now(),
        title: title,
      chapters: []
    };
      setDocuments(prevDocs => [...prevDocs, newDoc]);
    setSelectedDoc(newDoc);
      setPreviewMode(false);
    }
  };

  const handleDeleteClick = (doc) => {
    setDeleteConfirm({
      isOpen: true,
      docId: doc.id,
      docTitle: doc.title
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm.docId) {
      setDocuments(documents.filter(doc => doc.id !== deleteConfirm.docId));

      if (selectedDoc?.id === deleteConfirm.docId) {
      setSelectedDoc(null);
        setPreviewMode(false);
      }
    }
  };

  const handleUpdateDocument = (updatedDoc) => {
    const updatedDocuments = documents.map(doc =>
      doc.id === updatedDoc.id ? updatedDoc : doc
    );
    setDocuments(updatedDocuments);
    setSelectedDoc(updatedDoc);
  };

  return (
    <div className="document-manager">
      <div className="doc-list-section">
        <div className="search-section">
          <DocumentSearchBar onSearch={onSearch} />
        </div>
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-indicator"></span>
            文档列表
          </h2>
          <button
            type="button"
            className="add-doc-btn-circle"
            onClick={handleOpenAddModal}
            aria-label="添加文档"
            title="添加文档"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="doc-list">
          {searchKeyword && (
            <div className="search-result-info">
              找到 {filteredDocuments.length} 个结果
            </div>
          )}
          {(searchKeyword ? filteredDocuments : documents).map(doc => (
            <div
              key={doc.id}
              className={`doc-item ${selectedDoc?.id === doc.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedDoc(doc);
                setPreviewMode(false);
                if (onPreviewChange) {
                  onPreviewChange(false);
                }
              }}
            >
              <div className="doc-item-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4C4 2.89543 4.89543 2 6 2H10.5858C10.9836 2 11.3651 2.15804 11.6464 2.43934L15.5607 6.35355C15.842 6.63486 16 7.01639 16 7.41421V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V4Z" fill="#5584FF" fillOpacity="0.1" stroke="#5584FF" strokeWidth="1.5"/>
                  <path d="M10 2V7H15" stroke="#5584FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="doc-title" onDoubleClick={(e) => handleOpenEditModal(doc, e)}>
                {doc.title}
              </div>
              <div className="doc-item-actions">
                <button
                  type="button"
                  className="edit-doc-btn"
                  onClick={(e) => handleOpenEditModal(doc, e)}
                  aria-label={`编辑文档：${doc.title}`}
                  title="编辑"
                >
                  <svg viewBox="0 0 1024 1024" width="16" height="16" fill="currentColor" fillRule="evenodd">
                    <path d="M152.57 938.599q-1.612.122-3.228.122-4.214 0-8.348-.823-4.133-.822-8.027-2.435-3.893-1.612-7.397-3.954-3.504-2.34-6.484-5.32-2.98-2.98-5.321-6.485-2.342-3.504-3.955-7.397-1.612-3.894-2.434-8.027-.823-4.134-.823-8.348t.823-8.348q.822-4.133 2.434-8.026 1.613-3.894 3.955-7.398 2.34-3.504 5.32-6.484 2.98-2.98 6.485-5.321 3.504-2.342 7.397-3.954 3.894-1.613 8.027-2.435 4.134-.823 8.348-.823 1.616 0 3.228.122h761.546q1.61-.122 3.226-.122 4.213 0 8.345.823 4.133.822 8.031 2.435 3.892 1.612 7.395 3.954 3.504 2.341 6.488 5.321 2.977 2.98 5.317 6.484 2.341 3.504 3.957 7.398 1.61 3.893 2.436 8.026.82 4.134.82 8.348t-.82 8.348q-.827 4.133-2.436 8.027-1.616 3.893-3.957 7.397-2.34 3.504-5.317 6.484-2.984 2.98-6.488 5.321-3.503 2.342-7.395 3.954-3.898 1.613-8.03 2.435-4.133.823-8.346.823-1.617 0-3.226-.122H152.57ZM645.999 97.776l-441.52 442.049q-5.993 6-9.236 13.836Q192 561.497 192 569.977v155.309q0 4.202.82 8.324.82 4.12 2.428 8.004 1.608 3.882 3.943 7.376 2.334 3.494 5.306 6.465 2.971 2.972 6.465 5.307 3.494 2.335 7.377 3.943 3.882 1.608 8.004 2.428 4.121.82 8.324.82h156.1q8.489 0 16.332-3.25t13.844-9.254l441.234-441.427q2.969-2.972 5.303-6.465t3.941-7.375q1.607-3.882 2.426-8.002.82-4.12.82-8.321t-.82-8.322q-.819-4.12-2.426-8.001-1.607-3.882-3.941-7.375-2.334-3.494-5.303-6.466L706.339 97.789q-6-6.002-13.84-9.252-7.841-3.25-16.327-3.251-8.487-.002-16.329 3.244-7.841 3.246-13.844 9.246Zm30.175 90.54-398.84 399.319v94.984h95.754l398.586-398.76-95.5-95.542Z"></path>
                  </svg>
                </button>
              <button
                  type="button"
                className="delete-btn"
                onClick={(e) => {
                    e.preventDefault();
                  e.stopPropagation();
                  handleDeleteClick(doc);
                }}
                  aria-label={`删除文档：${doc.title}`}
                  title="删除"
              >
                  <svg height="16" viewBox="0 0 1024 1024" width="16" fill="currentColor">
                    <path d="M840 217h112a60 60 0 0 1 0 120h-53v587c0 30-22 55-52 58H192a59 59 0 0 1-59-58V337H72c-31 0-56-23-60-53v-7c0-33 27-60 60-60h120zm-58 120H251v528h531zM427 452c33 1 59 27 59 59v177c0 32-26 58-59 59-32-1-59-27-59-59V511c0-32 27-58 59-59zm177 0c32 1 58 27 58 59v177c0 32-26 58-58 59-33-1-59-27-59-59V511c0-32 26-58 59-59zm55-410a58 58 0 1 1 0 116H370a58 58 0 0 1 0-116z"></path>
                  </svg>
              </button>
              </div>
            </div>
          ))}

          {!searchKeyword && documents.length === 0 && (
            <div className="empty-state">
              暂无文档，点击上方「添加」按钮创建第一个文档
            </div>
          )}
          {searchKeyword && filteredDocuments.length === 0 && (
            <div className="empty-state">
              未找到匹配的文档
            </div>
          )}
        </div>
      </div>

      <div className="doc-content-section">
        {selectedDoc ? (
          <>
            {previewMode ? (
              (() => {
                // 从documents数组中获取最新的文档数据，确保预览显示最新内容
                const currentDoc = documents.find(doc => doc.id === selectedDoc.id) || selectedDoc;
                return (
                  <div className="document-preview">
                    <div className="preview-header">
                      <h2>{currentDoc.title}</h2>
                      <button
                        type="button"
                        className="back-to-edit-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setPreviewMode(false);
                          if (onPreviewChange) {
                            onPreviewChange(false);
                          }
                        }}
                        aria-label="返回编辑模式"
                      >
                        返回编辑
                      </button>
                    </div>
                    <div className="preview-content">
                      {currentDoc.chapters.length === 0 ? (
                        <div className="empty-preview">
                          <p>该文档还没有章节内容</p>
                        </div>
                      ) : (
                        currentDoc.chapters.map((chapter, index) => (
                          <div key={chapter.id} className="preview-chapter">
                            <h3 className="preview-chapter-title">
                              第 {index + 1} 章：{chapter.title}
                            </h3>
                            {chapter.content ? (
                              <div className="preview-chapter-content">
                                {chapter.content.split('\n').map((line, lineIndex) => (
                                  <p key={lineIndex}>{line || '\u00A0'}</p>
                                ))}
                              </div>
                            ) : (
                              <p className="preview-empty-content">（本章节暂无内容）</p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })()
            ) : (
          <ChapterManager
            document={selectedDoc}
            onUpdateDocument={handleUpdateDocument}
                onPreview={() => {
                  setPreviewMode(true);
                  if (onPreviewChange) {
                    onPreviewChange(true);
                  }
                }}
              />
            )}
          </>
        ) : (
          <div className="no-selection">
            <h3>请选择一个文档</h3>
            <p>或创建一个新文档开始写作</p>
          </div>
        )}
      </div>

      <DocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDocument}
        document={editingDoc}
      />

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, docId: null, docTitle: '' })}
        onConfirm={handleDeleteConfirm}
        title="删除文档"
        message={`确定要删除文档"${deleteConfirm.docTitle}"吗？此操作不可恢复，文档下的所有章节也将被删除。`}
        confirmText="删除"
        cancelText="取消"
      />
    </div>
  );
};

export default DocumentManager;
