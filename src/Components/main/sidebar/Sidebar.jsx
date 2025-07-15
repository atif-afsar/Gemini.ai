// src/components/Sidebar/Sidebar.jsx

import React, { useContext, useState, useEffect } from 'react';
import './Sidebar.css';
import { assets } from '../../../assets/assets';
import { Context } from '../../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const {
    onSent,
    prevPrompt,
    setRecentPrompt,
    clearChat,
    loadChat
  } = useContext(Context).contextValue;

  // Close sidebar on route change or resize (for better UX)
  useEffect(() => {
    if (!extended) return;
    const handleResize = () => {
      if (window.innerWidth > 600) setExtended(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [extended]);

  // Prevent background scroll when sidebar is open on mobile
  useEffect(() => {
    if (extended && window.innerWidth <= 600) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [extended]);

  // Click overlay or ESC to close sidebar
  useEffect(() => {
    if (!extended) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setExtended(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [extended]);

  return (
    <>
      {/* Mobile Header */}
      <div className="sidebar-mobile-header">
        <img
          className='menu'
          src={assets.menu_icon}
          alt='menu icon'
          onClick={() => setExtended(true)}
        />
        <span className="sidebar-mobile-title"></span>
      </div>
      {/* Overlay for mobile */}
      {extended && window.innerWidth <= 600 && (
        <div className="sidebar-overlay" onClick={() => setExtended(false)} />
      )}
      <div className={`sidebar${extended ? ' extended' : ''}`}>
        {/* Desktop expand/collapse toggle */}
        <button
          className="expand-toggle"
          style={{ display: window.innerWidth > 600 ? 'flex' : 'none' }}
          onClick={() => setExtended(prev => !prev)}
          aria-label={extended ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {/* Use a chevron icon if available, else fallback to unicode */}
          <img
            src={assets.chevron_icon || ''}
            alt="toggle sidebar"
            style={{ display: assets.chevron_icon ? 'block' : 'none' }}
          />
          {!assets.chevron_icon && (
            <span style={{fontSize:'22px',fontWeight:700,transform:extended?'rotate(180deg)':'none',transition:'transform 0.3s'}}>▶</span>
          )}
        </button>
        <div className='top'>
          <img
            onClick={() => setExtended(false)}
            className='menu'
            src={assets.menu_icon}
            alt='menu icon'
          />
          <div className='new-chat' title={!extended ? 'New Chat' : undefined} style={{ justifyContent: 'center' }} onClick={() => {
            if (window.confirm('Start a new chat? Current chat will be cleared.')) {
              if (typeof window !== 'undefined') window.scrollTo(0, 0);
              if (typeof clearChat === 'function') clearChat();
            }
          }}>
            <img src={assets.plus_icon} alt='new chat icon' />
            {extended && <span className='new-chat-text'>New Chat</span>}
          </div>

          {extended && (
            <div className='recent'>
              <p className='recent-title'>Recent</p>
              {prevPrompt.map((chat, index) => (
                <div key={index} className='recent-entry' onClick={() => loadChat(chat)} style={{cursor: 'pointer'}}>
                  <img src={assets.message_icon} alt='' />
                  <p>{chat.prompt}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='bottom'>
          <div className='bottom-item recent-entry'>
            <img src={assets.question_icon} alt='' />
            {extended && <p>Help</p>}
          </div>
          <div className='bottom-item recent-entry'>
            <img src={assets.history_icon} alt='' />
            {extended && <p>Activity</p>}
          </div>
          <div className='bottom-item recent-entry'>
            <img src={assets.setting_icon} alt='' />
            {extended && <p>Settings</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
