import React, { useState } from 'react';
import '../styles/ChapterManager.css';

const ChapterManager = ({ document, onUpdateDocument }) => {
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [editingChapter, setEditingChapter] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  const handleAddChapter = () => {
    if (!newChapterTitle.trim()) return;

    const newChapter = {
      id: Date.now(),
      title: newChapterTitle.trim(),
      content: ''
    };

    const updatedDoc = {
      ...document,
      chapters: [...document.chapters, newChapter]
    };

    onUpdateDocument(updatedDoc);
    setNewChapterTitle('');
  };

  const handleDeleteChapter = (chapterId) => {
    const updatedDoc = {
      ...document,
      chapters: document.chapters.filter(chapter => chapter.id !== chapterId)
    };

    onUpdateDocument(updatedDoc);
    
    if (editingChapter?.id === chapterId) {
      setEditingChapter(null);
      setEditingContent('');
    }
  };

  const handleStartEditing = (chapter) => {
    setEditingChapter(chapter);
    setEditingContent(chapter.content);
  };

  const handleSaveContent = () => {
    if (!editingChapter) return;

    const updatedDoc = {
      ...document,
      chapters: document.chapters.map(chapter => 
        chapter.id === editingChapter.id ? 
        { ...chapter, content: editingContent } : 
        chapter
      )
    };

    onUpdateDocument(updatedDoc);
  };

  return (
    <div className="chapter-manager">
      <div className="chapter-header">
        <h2>{document.title}</h2>
      </div>

      <div className="chapter-controls">
        <div className="add-chapter-form">
          <input
            type="text"
            placeholder="输入章节标题"
            value={newChapterTitle}
            onChange={(e) => setNewChapterTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddChapter()}
          />
          <button onClick={handleAddChapter}>添加章节</button>
        </div>
      </div>

      <div className="chapter-list">
        {document.chapters.map(chapter => (
          <div key={chapter.id} className="chapter-item">
            <div className="chapter-title">
              {chapter.title}
              <button
                className="delete-chapter-btn"
                onClick={() => handleDeleteChapter(chapter.id)}
              >
                删除
              </button>
            </div>
            
            <div className="chapter-actions">
              <button
                className={`edit-btn ${editingChapter?.id === chapter.id ? 'active' : ''}`}
                onClick={() => handleStartEditing(chapter)}
              >
                {editingChapter?.id === chapter.id ? '保存' : '编辑内容'}
              </button>
            </div>
            
            {editingChapter?.id === chapter.id && (
              <div className="content-editor">
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  placeholder="输入章节内容..."
                  rows="10"
                />
                <div className="editor-actions">
                  <button onClick={handleSaveContent}>保存</button>
                  <button
                    onClick={() => {
                      setEditingChapter(null);
                      setEditingContent('');
                    }}
                  >
                    取消
                  </button>
                </div>
              </div>
            )}

            {editingChapter?.id !== chapter.id && chapter.content && (
              <div className="content-preview">
                <h4>内容预览</h4>
                <div className="preview-content">
                  {chapter.content.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {document.chapters.length === 0 && (
          <div className="empty-chapters">
            暂无章节，点击上方「添加章节」按钮创建第一个章节
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterManager;
