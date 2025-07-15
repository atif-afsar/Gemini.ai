import React, { useContext } from 'react';
import { assets } from '../../../assets/assets';
import { Context } from '../../../context/Context';
import './Sidebar.css';

const navItems = [
  { key: 'new', label: 'New', icon: assets.plus_icon },
  { key: 'recent', label: 'Recent', icon: assets.message_icon },
  { key: 'help', label: 'Help', icon: assets.question_icon },
  { key: 'activity', label: 'Activity', icon: assets.history_icon },
  { key: 'settings', label: 'Settings', icon: assets.setting_icon },
];

const BottomNav = () => {
  const {
    clearChat,
    prevPrompt,
    loadChat
  } = useContext(Context).contextValue;

  // For demo: clicking 'Recent' loads the most recent chat, others are placeholders
  const handleNav = (key) => {
    if (key === 'new') clearChat();
    else if (key === 'recent' && prevPrompt.length > 0) loadChat(prevPrompt[0]);
    // Add more actions as needed
  };

  return (
    <nav className="bottom-nav">
      {navItems.map(item => (
        <button
          className="nav-btn"
          key={item.key}
          onClick={() => handleNav(item.key)}
          title={item.label}
        >
          <img src={item.icon} alt={item.label + ' icon'} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
