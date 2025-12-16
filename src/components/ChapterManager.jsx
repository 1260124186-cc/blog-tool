import React, { useState, useMemo, useEffect } from 'react';
import '../styles/ChapterManager.css';

// 章节弹窗组件（内联）
const ChapterModal = ({ isOpen, onClose, onSave, chapter = null }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (chapter) {
        setTitle(chapter.title || '');
        setContent(chapter.content || '');
      } else {
        setTitle('');
        setContent('');
      }
      setError('');
    }
  }, [isOpen, chapter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('请输入章节标题');
      return;
    }

    if (trimmedTitle.length > 100) {
      setError('章节标题不能超过100个字符');
      return;
    }

    onSave({
      title: trimmedTitle,
      content: content.trim()
    });
    setTitle('');
    setContent('');
    setError('');
    onClose();
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
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
      <div className="modal-container chapter-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{chapter ? '编辑章节' : '添加章节'}</h2>
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
            <label htmlFor="chapter-title-input">章节标题</label>
            <input
              id="chapter-title-input"
              type="text"
              placeholder="请输入章节标题"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              autoFocus
              maxLength={100}
              aria-label="章节标题输入框"
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

          <div className="modal-form-group">
            <label htmlFor="chapter-content-input">章节内容</label>
            <textarea
              id="chapter-content-input"
              placeholder="请输入章节内容..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="12"
              aria-label="章节内容输入框"
            />
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
              {chapter ? '保存' : '创建'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 章节搜索栏组件（内联）
const ChapterSearchBar = ({ onSearch }) => {
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
            placeholder="输入章节名称或内容"
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
            <button type="button" className="clear-btn" onClick={handleClear} aria-label="清空搜索">
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

const ChapterManager = ({ document, onUpdateDocument, onPreview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, chapterId: null, chapterTitle: '' });
  const [searchKeyword, setSearchKeyword] = useState('');

  // 搜索过滤章节
  const filteredChapters = useMemo(() => {
    if (!searchKeyword.trim()) {
      return document.chapters;
    }

    const keyword = searchKeyword.toLowerCase();
    return document.chapters.filter(chapter => {
      const matchTitle = chapter.title.toLowerCase().includes(keyword);
      const matchContent = chapter.content.toLowerCase().includes(keyword);
      return matchTitle || matchContent;
    });
  }, [document.chapters, searchKeyword]);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const handleOpenAddModal = () => {
    setEditingChapter(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (chapter) => {
    setEditingChapter(chapter);
    setIsModalOpen(true);
  };

  const handleSaveChapter = (data) => {
    if (editingChapter) {
      // 编辑现有章节
    const updatedDoc = {
      ...document,
      chapters: document.chapters.map(chapter =>
        chapter.id === editingChapter.id ?
          { ...chapter, title: data.title, content: data.content } :
        chapter
      )
      };
      onUpdateDocument(updatedDoc);
    } else {
      // 添加新章节
      const newChapter = {
        id: Date.now(),
        title: data.title,
        content: data.content
      };
      const updatedDoc = {
        ...document,
        chapters: [...document.chapters, newChapter]
      };
      onUpdateDocument(updatedDoc);
    }
  };

  const handleDeleteClick = (chapter) => {
    setDeleteConfirm({
      isOpen: true,
      chapterId: chapter.id,
      chapterTitle: chapter.title
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm.chapterId) {
      const updatedDoc = {
        ...document,
        chapters: document.chapters.filter(chapter => chapter.id !== deleteConfirm.chapterId)
      };
    onUpdateDocument(updatedDoc);

      if (editingChapter?.id === deleteConfirm.chapterId) {
        setEditingChapter(null);
      }
    }
  };

  return (
    <div className="chapter-manager">
      <div className="chapter-header">
        <div className="doc-title-section">
        <h2>{document.title}</h2>
          <span className="chapter-count">{document.chapters.length}个章节</span>
        </div>
        {onPreview && (
          <button
            type="button"
            className="preview-doc-btn"
            onClick={(e) => {
              e.preventDefault();
              onPreview();
            }}
            aria-label="预览文档"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8C1 8 4 2 8 2C12 2 15 8 15 8C15 8 12 14 8 14C4 14 1 8 1 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>预览</span>
          </button>
        )}
      </div>

      <div className="chapter-section-header">
        <h3 className="section-title">
          <span className="title-indicator orange"></span>
          章节列表
        </h3>
        <div className="chapter-header-actions">
          <div className="chapter-search-section">
            <ChapterSearchBar onSearch={handleSearch} />
          </div>
          <button
            type="button"
            className="add-chapter-btn"
            onClick={(e) => {
              e.preventDefault();
              handleOpenAddModal();
            }}
            aria-label="添加章节"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4V12M4 8H12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>添加</span>
          </button>
        </div>
      </div>

      {searchKeyword && (
        <div className="chapter-search-result-info">
          找到 {filteredChapters.length} 个结果
        </div>
      )}

      <div className="chapter-list">
        {filteredChapters.map((chapter, index) => {
          // 计算原始索引（用于显示章节编号）
          const originalIndex = document.chapters.findIndex(c => c.id === chapter.id);
          return (
          <div key={chapter.id} className="chapter-item">
            <div className="chapter-header-row">
              <div className="chapter-number">{originalIndex + 1}</div>
              <div className="chapter-info">
                <div className="chapter-title-text">{chapter.title}</div>
                {chapter.content && (
                  <div className="chapter-content-preview">
                    {chapter.content}
                  </div>
                )}
            </div>
              <div className="chapter-actions-right">
              <button
                  type="button"
                  className="edit-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenEditModal(chapter);
                  }}
                  aria-label={`编辑章节：${chapter.title}`}
                  title="编辑"
                >
                  <svg viewBox="0 0 1024 1024" width="16" height="16" fill="currentColor" fillRule="evenodd">
                    <path d="M152.57 938.599q-1.612.122-3.228.122-4.214 0-8.348-.823-4.133-.822-8.027-2.435-3.893-1.612-7.397-3.954-3.504-2.34-6.484-5.32-2.98-2.98-5.321-6.485-2.342-3.504-3.955-7.397-1.612-3.894-2.434-8.027-.823-4.134-.823-8.348t.823-8.348q.822-4.133 2.434-8.026 1.613-3.894 3.955-7.398 2.34-3.504 5.32-6.484 2.98-2.98 6.485-5.321 3.504-2.342 7.397-3.954 3.894-1.613 8.027-2.435 4.134-.823 8.348-.823 1.616 0 3.228.122h761.546q1.61-.122 3.226-.122 4.213 0 8.345.823 4.133.822 8.031 2.435 3.892 1.612 7.395 3.954 3.504 2.341 6.488 5.321 2.977 2.98 5.317 6.484 2.341 3.504 3.957 7.398 1.61 3.893 2.436 8.026.82 4.134.82 8.348t-.82 8.348q-.827 4.133-2.436 8.027-1.616 3.893-3.957 7.397-2.34 3.504-5.317 6.484-2.984 2.98-6.488 5.321-3.503 2.342-7.395 3.954-3.898 1.613-8.03 2.435-4.133.823-8.346.823-1.617 0-3.226-.122H152.57ZM645.999 97.776l-441.52 442.049q-5.993 6-9.236 13.836Q192 561.497 192 569.977v155.309q0 4.202.82 8.324.82 4.12 2.428 8.004 1.608 3.882 3.943 7.376 2.334 3.494 5.306 6.465 2.971 2.972 6.465 5.307 3.494 2.335 7.377 3.943 3.882 1.608 8.004 2.428 4.121.82 8.324.82h156.1q8.489 0 16.332-3.25t13.844-9.254l441.234-441.427q2.969-2.972 5.303-6.465t3.941-7.375q1.607-3.882 2.426-8.002.82-4.12.82-8.321t-.82-8.322q-.819-4.12-2.426-8.001-1.607-3.882-3.941-7.375-2.334-3.494-5.303-6.466L706.339 97.789q-6-6.002-13.84-9.252-7.841-3.25-16.327-3.251-8.487-.002-16.329 3.244-7.841 3.246-13.844 9.246Zm30.175 90.54-398.84 399.319v94.984h95.754l398.586-398.76-95.5-95.542Z"></path>
                  </svg>
              </button>
                  <button
                  type="button"
                  className="delete-chapter-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteClick(chapter);
                  }}
                  aria-label={`删除章节：${chapter.title}`}
                  title="删除"
                >
                  <svg height="16" viewBox="0 0 1024 1024" width="16" fill="currentColor">
                    <path d="M840 217h112a60 60 0 0 1 0 120h-53v587c0 30-22 55-52 58H192a59 59 0 0 1-59-58V337H72c-31 0-56-23-60-53v-7c0-33 27-60 60-60h120zm-58 120H251v528h531zM427 452c33 1 59 27 59 59v177c0 32-26 58-59 59-32-1-59-27-59-59V511c0-32 27-58 59-59zm177 0c32 1 58 27 58 59v177c0 32-26 58-58 59-33-1-59-27-59-59V511c0-32 26-58 59-59zm55-410a58 58 0 1 1 0 116H370a58 58 0 0 1 0-116z"></path>
                  </svg>
                  </button>
              </div>
                </div>
              </div>
          );
        })}

        {!searchKeyword && document.chapters.length === 0 && (
          <div className="empty-chapters">
            暂无章节，点击上方「添加」按钮创建第一个章节
          </div>
        )}

        {searchKeyword && filteredChapters.length === 0 && (
          <div className="empty-chapters">
            未找到匹配的章节
          </div>
        )}
      </div>

      <ChapterModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingChapter(null);
        }}
        onSave={handleSaveChapter}
        chapter={editingChapter}
      />

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, chapterId: null, chapterTitle: '' })}
        onConfirm={handleDeleteConfirm}
        title="删除章节"
        message={`确定要删除章节"${deleteConfirm.chapterTitle}"吗？此操作不可恢复。`}
        confirmText="删除"
        cancelText="取消"
      />
    </div>
  );
};

export default ChapterManager;
