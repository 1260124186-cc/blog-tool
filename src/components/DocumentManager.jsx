import React, { useState } from 'react';
import '../styles/DocumentManager.css';
import ChapterManager from './ChapterManager';

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);

  const handleAddDocument = () => {
    if (!newDocTitle.trim()) return;
    
    const newDoc = {
      id: Date.now(),
      title: newDocTitle.trim(),
      chapters: []
    };
    
    setDocuments([...documents, newDoc]);
    setNewDocTitle('');
    setSelectedDoc(newDoc);
  };

  const handleDeleteDocument = (docId) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
    
    if (selectedDoc?.id === docId) {
      setSelectedDoc(null);
    }
  };

  const handleUpdateDocument = (updatedDoc) => {
    setDocuments(documents.map(doc => 
      doc.id === updatedDoc.id ? updatedDoc : doc
    ));
    
    setSelectedDoc(updatedDoc);
  };

  return (
    <div className="document-manager">
      <div className="doc-list-section">
        <div className="section-header">
          <h2>文档列表</h2>
          <div className="add-doc-form">
            <input
              type="text"
              placeholder="输入文档标题"
              value={newDocTitle}
              onChange={(e) => setNewDocTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddDocument()}
            />
            <button onClick={handleAddDocument}>添加</button>
          </div>
        </div>
        
        <div className="doc-list">
          {documents.map(doc => (
            <div
              key={doc.id}
              className={`doc-item ${selectedDoc?.id === doc.id ? 'active' : ''}`}
              onClick={() => setSelectedDoc(doc)}
            >
              <div className="doc-title">{doc.title}</div>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteDocument(doc.id);
                }}
              >
                删除
              </button>
            </div>
          ))}
          
          {documents.length === 0 && (
            <div className="empty-state">
              暂无文档，点击上方「添加」按钮创建第一个文档
            </div>
          )}
        </div>
      </div>

      <div className="doc-content-section">
        {selectedDoc ? (
          <ChapterManager 
            document={selectedDoc}
            onUpdateDocument={handleUpdateDocument}
          />
        ) : (
          <div className="no-selection">
            <h3>请选择一个文档</h3>
            <p>或创建一个新文档开始写作</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentManager;
