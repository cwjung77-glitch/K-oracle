"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, ArrowLeft, Bot, Volume2 } from 'lucide-react';

export default function AiChatRoom({ scenario, onBack, onComplete }) {
  const [messages, setMessages] = useState([
    { role: 'system', content: `[Mission] ${scenario.description}` },
    { role: 'ai', content: scenario.initialMessage }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // TTS: Speak AI message
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text.split('(')[0]); // Only speak the Korean part before translation
      utterance.lang = 'ko-KR';
      
      // Try to find the most natural voice available in the user's browser
      const voices = window.speechSynthesis.getVoices();
      // Google's Korean voice or Apple's Yuna voice are usually the most natural default ones
      const premiumVoice = voices.find(v => 
        (v.name.includes('Yuna') || v.name.includes('Google') || v.name.includes('Siri')) && v.lang.includes('ko')
      );
      const defaultKoVoice = voices.find(v => v.lang.includes('ko'));
      
      if (premiumVoice) {
        utterance.voice = premiumVoice;
      } else if (defaultKoVoice) {
        utterance.voice = defaultKoVoice;
      }

      // Tweak pitch and rate to make it sound slightly more human/friendly
      utterance.pitch = 1.15; // Slightly higher pitch for a friendlier tone
      utterance.rate = 0.95;  // Slightly slower for better articulation

      window.speechSynthesis.speak(utterance);
    }
  };

  // Ensure voices are loaded (Chrome sometimes needs this to fetch voices)
  useEffect(() => {
    const loadVoices = () => { window.speechSynthesis.getVoices(); };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Trigger TTS for initial message on mount
  useEffect(() => {
    // Small delay to ensure voices are loaded before first speech
    const timer = setTimeout(() => speakText(scenario.initialMessage), 500);
    return () => clearTimeout(timer);
  }, [scenario]);

  // STT: Speech to text
  const toggleListen = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInput('');
    
    // Simulate AI processing and response
    setTimeout(() => {
      let aiReply = "";
      let feedback = "";
      let isSuccess = false;

      // Basic matching logic
      const isExpected = scenario.expectedResponses.some(exp => 
        userText.replace(/\s+/g, '').includes(exp.split('(')[0].replace(/\s+/g, ''))
      );

      if (isExpected || userText.length > 3) {
        aiReply = "와, 한국어 정말 잘하시네요! 완벽하게 이해했어요. (Wow, you speak Korean really well! I understood perfectly.)";
        feedback = "Great pronunciation! +100 EXP";
        isSuccess = true;
      } else {
        aiReply = "음... 다시 한 번 말씀해 주실래요? (Hmm... could you say that again?)";
        feedback = "Try speaking a bit louder or check the expected responses.";
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiReply, feedback }]);
      speakText(aiReply);

      if (isSuccess && onComplete) {
        setTimeout(() => onComplete(100), 2000);
      }
    }, 1000);
  };

  return (
    <div className="w-full h-[600px] bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col overflow-hidden shadow-2xl">
      
      {/* Header */}
      <div className="h-16 border-b border-zinc-800 flex items-center px-4 justify-between bg-zinc-950/80 backdrop-blur-md z-10">
        <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <h3 className="font-bold text-white">{scenario.characterName}</h3>
            <p className="text-xs text-neon-pink">{scenario.difficulty} Level</p>
          </div>
          <div className="relative">
            <img src={scenario.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-neon-purple" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-950"></div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            
            {msg.role === 'system' && (
              <div className="w-full text-center my-4">
                <span className="px-4 py-2 text-xs font-mono bg-neon-purple/10 text-neon-purple border border-neon-purple/30 rounded-full shadow-[0_0_10px_rgba(176,38,255,0.1)]">
                  {msg.content}
                </span>
                <div className="mt-2 text-xs text-zinc-500">
                  Hint: Try saying "{scenario.expectedResponses[0]}"
                </div>
              </div>
            )}

            {msg.role !== 'system' && (
              <div className="group relative max-w-[80%]">
                <div className={`rounded-2xl px-5 py-3 shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-neon-purple to-purple-600 text-white rounded-br-none' 
                    : 'bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-bl-none'
                }`}>
                  {msg.content}
                </div>
                {msg.role === 'ai' && (
                  <button 
                    onClick={() => speakText(msg.content)}
                    className="absolute -right-8 top-2 p-1 text-zinc-500 hover:text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Volume2 size={16} />
                  </button>
                )}
              </div>
            )}
            
            {/* Feedback tooltip */}
            {msg.feedback && (
              <div className="mt-2 text-xs flex items-center gap-1 text-neon-blue bg-neon-blue/10 px-3 py-1.5 rounded-lg border border-neon-blue/20">
                <Bot size={14} /> {msg.feedback}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type in Korean or tap mic to speak..."
            className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
          />
          <button 
            onClick={toggleListen}
            className={`p-3 rounded-xl transition-all duration-300 ${
              isListening 
                ? 'bg-neon-pink text-white shadow-[0_0_20px_rgba(255,16,122,0.6)] animate-pulse' 
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700'
            }`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 bg-neon-purple text-white rounded-xl hover:bg-purple-600 transition-colors shadow-[0_0_15px_rgba(176,38,255,0.4)] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

    </div>
  );
}
