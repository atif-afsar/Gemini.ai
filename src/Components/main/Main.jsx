import React, { useContext, useEffect, useState, useRef } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const AnimatedDots = () => (
  <span className="animated-dots">
    <span>.</span><span>.</span><span>.</span>
  </span>
);

const BlinkingCursor = () => (
  <span style={{
    display: 'inline-block',
    width: '1ch',
    animation: 'blink 1s steps(1) infinite',
    color: '#4b90ff',
    fontWeight: 700
  }}>|</span>
);

// Modern Shimmer Loader
const ShimmerLoader = () => (
  <div className="shimmer-loader">
    <div className="shimmer-bar bar1"></div>
    <div className="shimmer-bar bar2"></div>
    <div className="shimmer-bar bar3"></div>
  </div>
);

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, isTyping, input, setInput } = useContext(Context).contextValue;
  const [typedText, setTypedText] = useState("");
  const typingIndex = useRef(0);
  const typingTimeout = useRef(null);

  useEffect(() => {
    if (isTyping && resultData) {
      setTypedText("");
      typingIndex.current = 0;

      const type = () => {
        setTypedText(prev => {
          const nextText = prev + resultData[typingIndex.current];
          typingIndex.current++;
          if (typingIndex.current < resultData.length) {
            typingTimeout.current = setTimeout(type, 18);
          }
          return nextText;
        });
      };

      if (resultData.length > 0) {
        type();
      }
    } else if (!isTyping && resultData) {
      setTypedText(resultData);
    }

    // Cleanup on unmount or when resultData/isTyping changes
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [resultData, isTyping]);

  return (
    <div className='main'>
      <div className='nav'>
        <p><span className="gradient-text">SHOTkut.ai</span></p>
        <img src={assets.user_icon} alt="user icon" />
      </div>
      <div className="main-container">
        {loading ? (
          <div className='result' style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
              <img src={assets.user_icon} alt="user icon" style={{ width: 40, height: 40, borderRadius: '50%', marginBottom: 2 }} />
              <div className="chat-bubble user-bubble">
                <p style={{ fontWeight: 600, margin: 0 }}>{input}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
              <img src={assets.gemini_icon} alt="Gemini.ai icon" style={{ width: 40, height: 40, borderRadius: '50%', marginBottom: 2 }} />
              <div className="chat-bubble bot-bubble">
                <ShimmerLoader />
              </div>
            </div>
          </div>
        ) : !showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today</p>
            </div>
            {window.innerWidth > 600 && (
              <div className="cards">
                <div className="card">
                  <p>Suggest beautiful places to see on an upcoming road trip</p>
                  <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                  <p>Briefly summarize this concept: urban planning</p>
                  <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                  <p>Brainstorm team bonding activities for our work retreat</p>
                  <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                  <p>Improve the readability of the following code</p>
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className='result' style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* User message */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
              <img src={assets.user_icon} alt="user icon" style={{ width: 40, height: 40, borderRadius: '50%', marginBottom: 2 }} />
              <div className="chat-bubble user-bubble">
                <p style={{ fontWeight: 600, margin: 0 }}>{recentPrompt}</p>
              </div>
            </div>
            {/* Bot message */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
              <img src={assets.gemini_icon} alt="Gemini.ai icon" style={{ width: 40, height: 40, borderRadius: '50%', marginBottom: 2 }} />
              <div className="chat-bubble bot-bubble">
                {isTyping ? (
                  <p style={{ minHeight: 24, marginBottom: 0, fontWeight: 500, fontSize: 18, color: '#2d3a4a' }}>
                    {typedText}
                    <BlinkingCursor />
                  </p>
                ) : (
                  <p style={{ minHeight: 24, marginBottom: 0, fontWeight: 500, fontSize: 18, color: '#2d3a4a' }}>
                    {typedText}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        <div className='main-bottom'>
          <div className='search-box'>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder='Enter a prompt here'
              onKeyDown={e => {
                if (e.key === 'Enter' && input.trim()) onSent(input);
              }}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img
                onClick={() => input.trim() && onSent(input)}
                src={assets.send_icon}
                alt=""
                style={{ opacity: input.trim() ? 1 : 0.4, cursor: input.trim() ? 'pointer' : 'not-allowed' }}
              />
            </div>
          </div>
          <p className='bottom-info'>
            SHOTkut.ai may display inaccurate info, including about people, so double-check its responses.
            Your privacy and SHOTkut.ai Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
