import React, { useState, useEffect } from 'react';
import '../src/styles/global.css';
import DocumentManager from './components/DocumentManager';

function App() {
  const [previewMode, setPreviewMode] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [showToast, setShowToast] = useState(false);

  const handleSearch = (keyword, type) => {
    setSearchKeyword(keyword);
    setSearchType(type);
  };

  const handleUserClick = () => {
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="24" height="24" rx="4" fill="white"/>
                <rect x="4" y="4" width="20" height="20" rx="3" fill="url(#logoGradient)"/>
                <circle cx="14" cy="14" r="5" fill="white"/>
                <path d="M14 10V18M10 14H18" stroke="#5584FF" strokeWidth="1.5" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="logoGradient" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#5584FF"/>
                    <stop offset="100%" stopColor="#6A9AFF"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="logo-text">博客管理工具</span>
          </div>
        </div>
        <div className="header-right">
          <div className="user-info" onClick={handleUserClick}>
            <div className="user-avatar">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="url(#avatarGradient)"/>
                <path d="M18 9C15.79 9 14 10.79 14 13C14 15.21 15.79 17 18 17C20.21 17 22 15.21 22 13C22 10.79 20.21 9 18 9ZM18 20C14.67 20 10 21.33 10 24.67V27H26V24.67C26 21.33 21.33 20 18 20Z" fill="white"/>
                <defs>
                  <linearGradient id="avatarGradient" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6A9AFF"/>
                    <stop offset="100%" stopColor="#5584FF"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="user-name">Lily</span>
          </div>
        </div>
      </header>
      {showToast && (
        <div className="toast-container">
          <div className="toast-content">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="toast-icon">
              <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM8 13.5C4.96243 13.5 2.5 11.0376 2.5 8C2.5 4.96243 4.96243 2.5 8 2.5C11.0376 2.5 13.5 4.96243 13.5 8C13.5 11.0376 11.0376 13.5 8 13.5Z" fill="currentColor"/>
              <path d="M8 4.5C7.58579 4.5 7.25 4.83579 7.25 5.25V8.75C7.25 9.16421 7.58579 9.5 8 9.5C8.41421 9.5 8.75 9.16421 8.75 8.75V5.25C8.75 4.83579 8.41421 4.5 8 4.5Z" fill="currentColor"/>
              <path d="M8 11C8.41421 11 8.75 10.6642 8.75 10.25C8.75 9.83579 8.41421 9.5 8 9.5C7.58579 9.5 7.25 9.83579 7.25 10.25C7.25 10.6642 7.58579 11 8 11Z" fill="currentColor"/>
            </svg>
            <span className="toast-message">功能正在开发中</span>
          </div>
        </div>
      )}
      <div className="banner-container">
        <svg
          className="banner-svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="none"
          version="1.1"
          viewBox="0 0 832 295"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient x1="0" y1="0.9604008197784424" x2="1" y2="0.5296266674995422" id="master_svg0_13_68225">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1"/>
              <stop offset="41.21647775173187%" stopColor="#EBF1FF" stopOpacity="1"/>
              <stop offset="100%" stopColor="#E7EFFF" stopOpacity="0.5899999737739563"/>
            </linearGradient>
            <mask id="master_svg1_13_88214" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse">
              <g>
                <rect x="0" y="0" width="832" height="295" rx="8" fill="#FFFFFF" fillOpacity="1"/>
              </g>
            </mask>
            <filter id="master_svg2_13_88215" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB" x="-244" y="-244" width="707" height="707">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="61" result="effect1_foregroundBlur"/>
            </filter>
            <filter id="master_svg3_13_88218" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB" x="0" y="0" width="332" height="332">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
              <feOffset dy="10" dx="-8"/>
              <feGaussianBlur stdDeviation="12"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.7345132827758789 0 0 0 0 0.8230085372924805 0 0 0 0 1 0 0 0 0.1599999964237213 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
              <feGaussianBlur in="BackgroundImage" stdDeviation="71.5"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect2_foregroundBlur"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_foregroundBlur" result="shape"/>
            </filter>
            <linearGradient x1="0.8905268311500549" y1="0.17040058970451355" x2="0.4748290777206421" y2="0.9031563401222229" id="master_svg4_13_73181">
              <stop offset="0%" stopColor="#B8CEF9" stopOpacity="0.41999998688697815"/>
              <stop offset="43.39178502559662%" stopColor="#DAE5FD" stopOpacity="0.5299999713897705"/>
              <stop offset="100%" stopColor="#EAF1FE" stopOpacity="0.6200000047683716"/>
            </linearGradient>
            <filter id="master_svg5_13_88219" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB" x="-56" y="-52" width="179" height="179">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
              <feOffset dy="4" dx="0"/>
              <feGaussianBlur stdDeviation="14"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.3141593039035797 0 0 0 0 0.5656342506408691 0 0 0 0 1 0 0 0 0.4399999976158142 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            <linearGradient x1="0.8218905329704285" y1="0.08177021145820618" x2="0.04243316128849983" y2="0.9231472611427307" id="master_svg6_13_69846">
              <stop offset="0%" stopColor="#7EA6FF" stopOpacity="1"/>
              <stop offset="98.57142567634583%" stopColor="#D9E9FF" stopOpacity="0"/>
            </linearGradient>
            <filter id="master_svg7_13_88220" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB" x="-56" y="-52" width="183" height="183">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
              <feOffset dy="4" dx="0"/>
              <feGaussianBlur stdDeviation="14"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.3141593039035797 0 0 0 0 0.5656342506408691 0 0 0 0 1 0 0 0 0.4399999976158142 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
              <feOffset dy="10" dx="-8"/>
              <feGaussianBlur stdDeviation="12"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.7345132827758789 0 0 0 0 0.8230085372924805 0 0 0 0 1 0 0 0 0.1599999964237213 0"/>
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow"/>
            </filter>
            <linearGradient x1="0.8218905329704285" y1="0.08177021145820618" x2="0.04243316128849983" y2="0.9231472611427307" id="master_svg8_13_69313">
              <stop offset="0%" stopColor="#D9E9FF" stopOpacity="1"/>
              <stop offset="100%" stopColor="#817EFF" stopOpacity="1"/>
            </linearGradient>
            <filter id="master_svg9_13_88221" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB" x="-244" y="-244" width="707" height="707">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="61" result="effect1_foregroundBlur"/>
            </filter>
            <filter id="master_svga_13_88222" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB" x="0" y="0" width="385" height="385">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
              <feOffset dy="10" dx="-8"/>
              <feGaussianBlur stdDeviation="12"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.7345132827758789 0 0 0 0 0.8230085372924805 0 0 0 0 1 0 0 0 0.1599999964237213 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
              <feGaussianBlur in="BackgroundImage" stdDeviation="5"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect2_foregroundBlur"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_foregroundBlur" result="shape"/>
            </filter>
            <linearGradient x1="0.8218905329704285" y1="0.08177021145820618" x2="0.04243316128849983" y2="0.9231472611427307" id="master_svgb_13_60614">
              <stop offset="0%" stopColor="#B8CEF9" stopOpacity="0.41999998688697815"/>
              <stop offset="43.39178502559662%" stopColor="#DAE5FD" stopOpacity="0.5299999713897705"/>
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1599999964237213"/>
            </linearGradient>
            <linearGradient x1="1.0755103826522827" y1="0.15253974497318268" x2="-0.14688058197498322" y2="0.7960737347602844" id="master_svgc_13_64351">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1"/>
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <g mask="url(#master_svg1_13_88214)">
            <g>
              <rect x="0" y="0" width="832" height="295" rx="8" fill="url(#master_svg0_13_68225)" fillOpacity="1"/>
            </g>
            <g filter="url(#master_svg2_13_88215)">
              <ellipse cx="92.5" cy="223.5" rx="109.5" ry="109.5" fill="#D4CEFF" fillOpacity="0.4099999964237213"/>
            </g>
            <g transform="matrix(0.6921423673629761,-0.7217609882354736,0.7217609882354736,0.6921423673629761,-92.25533284496487,192.90359622861433)">
              <rect x="180.00006103515625" y="204.596435546875" width="602.1334838867188" height="395.6437683105469" rx="0" fill="#F3F6FF" fillOpacity="1"/>
            </g>
            <g transform="matrix(0.6921423673629761,-0.7217609882354736,0.7217609882354736,0.6921423673629761,-217.5976169811347,17.251126996525272)">
              <rect x="-88.57649230957031" y="263.7004089355469" width="761.4821166992188" height="331.2652893066406" rx="0" fill="#F6F9FF" fillOpacity="1"/>
            </g>
            <g filter="url(#master_svg3_13_88218)">
              <ellipse cx="264" cy="136" rx="166" ry="166" fill="url(#master_svg4_13_73181)" fillOpacity="1"/>
              <ellipse cx="264" cy="136" rx="165" ry="165" fillOpacity="0" strokeOpacity="1" stroke="#FFFFFF" fill="none" strokeWidth="2"/>
            </g>
            <g filter="url(#master_svg5_13_88219)">
              <ellipse cx="16.5" cy="6.5" rx="33.5" ry="33.5" fill="url(#master_svg6_13_69846)" fillOpacity="1"/>
              <ellipse cx="16.5" cy="6.5" rx="33" ry="33" fillOpacity="0" strokeOpacity="0.3400000035762787" stroke="#FFFFFF" fill="none" strokeWidth="1"/>
            </g>
            <g filter="url(#master_svg7_13_88220)">
              <ellipse cx="844.5" cy="174.5" rx="35.5" ry="35.5" fill="url(#master_svg8_13_69313)" fillOpacity="1"/>
            </g>
            <g filter="url(#master_svg9_13_88221)">
              <ellipse cx="578.5" cy="249.5" rx="109.5" ry="109.5" fill="#FFFACE" fillOpacity="0.7300000190734863"/>
            </g>
            <g transform="matrix(-1,0,0,1,1446,0)" filter="url(#master_svga_13_88222)">
              <ellipse cx="915.5" cy="140.5" rx="192.5" ry="192.5" fill="url(#master_svgb_13_60614)" fillOpacity="1"/>
              <ellipse cx="915.5" cy="140.5" rx="191.5" ry="191.5" stroke="url(#master_svgc_13_64351)" fillOpacity="0" fill="none" strokeWidth="2"/>
            </g>
          </g>
        </svg>
        <div className="banner-content">
          <h1 className="banner-title">博客中心，让学习成为一种享受</h1>
          <p className="banner-subtitle">—知识，从这里开始一</p>
        </div>
      </div>
      <div className="app-content-wrapper">
        <main className="app-main">
          <DocumentManager
            previewMode={previewMode}
            onPreviewChange={setPreviewMode}
            searchKeyword={searchKeyword}
            searchType={searchType}
            onSearch={handleSearch}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
