"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'EN', flag: 'us' },
  { code: 'es', name: 'ES', flag: 'es' },
  { code: 'th', name: 'TH', flag: 'th' },
  { code: 'id', name: 'ID', flag: 'id' },
  { code: 'ja', name: 'JA', flag: 'jp' },
  { code: 'de', name: 'DE', flag: 'de' },
  { code: 'it', name: 'IT', flag: 'it' },
  { code: 'pt', name: 'PT', flag: 'pt' },
  { code: 'pl', name: 'PL', flag: 'pl' },
  { code: 'ru', name: 'RU', flag: 'ru' },
  { code: 'vi', name: 'VI', flag: 'vn' },
  { code: 'fr', name: 'FR', flag: 'fr' }
];

export default function LanguageSwitcher({ lang, setLang, showKo }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeLang = languages.find(l => l.code === lang) || languages[0];
  const allLangs = showKo ? [...languages, { code: 'ko', name: 'KO', flag: 'kr' }] : languages;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative group z-50" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-full px-3 py-1.5 transition-colors text-white outline-none"
      >
        <Globe size={14} className="text-zinc-400" />
        <img 
          src={`https://flagcdn.com/w20/${activeLang.flag}.png`} 
          alt={activeLang.name} 
          className="w-4 h-3 object-cover rounded-[1px] ml-1"
        />
        <span className="text-xs font-bold tracking-wider">{activeLang.name}</span>
        <ChevronDown size={14} className="text-zinc-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl py-2 grid grid-cols-2 gap-1 px-2 z-50 max-h-64 overflow-y-auto">
          {allLangs.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                localStorage.setItem('kOracleLang', l.code);
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${lang === l.code ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
            >
              <img 
                src={`https://flagcdn.com/w20/${l.flag}.png`} 
                alt={l.name} 
                className="w-5 h-[14px] object-cover rounded-[2px]"
              />
              {l.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
