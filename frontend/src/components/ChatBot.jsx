// src/components/ChatBot.jsx  —  AgriBuddy 2.0  |  VIT_Coders
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const QUICK_REPLIES = [
  { label: 'What to plant?', text: 'What crops should I plant this season?' },
  { label: 'Fertilizer advice', text: 'What is the recommended fertilizer dosage for my crop?' },
  { label: 'Weather impact', text: 'How does rainfall affect my crop yield?' },
  { label: 'Pest control', text: 'How can I reduce pesticide use safely?' },
];

const ChatBot = ({ farmData, prediction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg = { role: 'user', content: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const context = {
        crop: farmData.crop,
        state: farmData.state,
        yield_min: prediction ? prediction - 2 : 0,
        yield_max: prediction ? prediction + 2 : 0,
        soil_ph: farmData.soil_ph,
        rainfall: farmData.annual_rainfall,
      };
      const res = await axios.post('/chat', {
        message: messageText,
        context,
      });
      const botMsg = { role: 'assistant', content: res.data.response };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I am offline. Please try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close AgriBuddy AI chat' : 'Open AgriBuddy AI chat'}
        aria-expanded={isOpen}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          width: '62px',
          height: '62px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2d6a4f 0%, #1a4d2e 100%)',
          border: '3px solid rgba(82,183,136,0.5)',
          cursor: 'pointer',
          boxShadow: '0 6px 24px rgba(26,77,46,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(26,77,46,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(26,77,46,0.4)';
        }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AgriBuddy AI Chat Assistant"
          aria-modal="true"
          style={{
            position: 'fixed',
            bottom: '104px',
            right: '28px',
            width: '370px',
            height: '540px',
            backgroundColor: '#ffffff',
            border: '1.5px solid var(--border)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1000,
            boxShadow: '0 12px 40px rgba(26,77,46,0.2), 0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          {/* Header with avatar */}
          <div
            style={{
              padding: '14px 16px',
              background: 'linear-gradient(135deg, #1a4d2e 0%, #2d6a4f 100%)',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                border: '2px solid rgba(255,255,255,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                flexShrink: 0,
              }} aria-hidden="true">
                🌱
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
                  AgriBuddy AI
                </div>
                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#52b788', display: 'inline-block' }}></span>
                  Online • Ask me anything
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '22px', lineHeight: 1, padding: '4px', minHeight: 'unset' }}
            >
              ✕
            </button>
          </div>

          {/* Messages area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              background: '#f8fdf9',
            }}
          >
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🌾</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px', fontWeight: 500 }}>
                  Ask about crops, soil, weather, or yield improvement!
                </div>
                {/* Quick reply chips */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr.label}
                      onClick={() => sendMessage(qr.text)}
                      style={{
                        background: '#ffffff',
                        border: '1.5px solid var(--husk-dark, #ddd0b8)',
                        borderRadius: '999px',
                        padding: '9px 16px',
                        fontSize: '0.82rem',
                        fontFamily: 'var(--font-main, Poppins)',
                        fontWeight: 600,
                        color: 'var(--soil-dark, #1a4d2e)',
                        cursor: 'pointer',
                        transition: 'background 0.15s, border-color 0.15s',
                        minHeight: '44px',
                        textAlign: 'left',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#eaf6ee';
                        e.currentTarget.style.borderColor = '#2d6a4f';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#ffffff';
                        e.currentTarget.style.borderColor = '#ddd0b8';
                      }}
                    >
                      {qr.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor:
                    msg.role === 'user'
                      ? 'linear-gradient(135deg, #2d6a4f, #1a4d2e)'
                      : '#ffffff',
                  background:
                    msg.role === 'user'
                      ? 'linear-gradient(135deg, #2d6a4f 0%, #1a4d2e 100%)'
                      : '#ffffff',
                  color: msg.role === 'user' ? 'white' : 'var(--bark, #3b2a1a)',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user'
                    ? '18px 18px 4px 18px'
                    : '18px 18px 18px 4px',
                  maxWidth: '82%',
                  wordWrap: 'break-word',
                  fontSize: '0.88rem',
                  lineHeight: 1.55,
                  fontWeight: 500,
                  border: msg.role === 'assistant' ? '1px solid var(--husk-dark, #ddd0b8)' : 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div style={{
                alignSelf: 'flex-start',
                background: '#ffffff',
                border: '1px solid var(--husk-dark, #ddd0b8)',
                padding: '10px 16px',
                borderRadius: '18px 18px 18px 4px',
                color: 'var(--text-secondary, #6b4c2a)',
                fontSize: '0.85rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span className="animate-pulse">🌿</span> Thinking…
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div
            style={{
              padding: '12px 14px',
              borderTop: '1.5px solid var(--husk-dark, #ddd0b8)',
              display: 'flex',
              gap: '8px',
              background: '#ffffff',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question… (Enter to send)"
              aria-label="Type your message"
              style={{
                flex: 1,
                padding: '9px 14px',
                backgroundColor: '#f5f0e8',
                border: '1.5px solid var(--husk-dark, #ddd0b8)',
                borderRadius: '999px',
                color: 'var(--bark, #3b2a1a)',
                fontFamily: 'var(--font-main, Poppins)',
                fontSize: '0.88rem',
                fontWeight: 500,
                outline: 'none',
                transition: 'border-color 0.2s',
                minHeight: '44px',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#2d6a4f'; }}
              onBlur={(e) => { e.target.style.borderColor = '#ddd0b8'; }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              style={{
                padding: '9px 18px',
                background: loading || !input.trim()
                  ? '#c4d9cd'
                  : 'linear-gradient(135deg, #2d6a4f 0%, #1a4d2e 100%)',
                border: 'none',
                borderRadius: '999px',
                color: 'white',
                fontFamily: 'var(--font-main, Poppins)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.18s ease',
                minHeight: '44px',
                minWidth: '70px',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;