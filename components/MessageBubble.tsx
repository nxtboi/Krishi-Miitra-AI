import React, { useState, useEffect, useMemo } from 'react';
import { ChatMessage, Role, LanguageCode } from '../types';
import { UserIcon, RobotIcon, SpeakerIcon, StopCircleIcon } from './icons/Icons';
import { detectSuppliesInText, DetectedSupplyItem, SHOPPING_PLATFORMS, ShoppingPlatformKey } from '../services/shoppingLinksService';
import { Sparkles, ExternalLink, ShoppingCart } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
  language: LanguageCode;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, language }) => {
  const isUser = message.role === Role.User;
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Auto-detect any crop seeds, fertilizers, or tools recommended in the AI response
  const detectedSupplies = useMemo(() => {
    if (isUser || !message.text) return [];
    return detectSuppliesInText(message.text);
  }, [isUser, message.text]);

  useEffect(() => {
    return () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
        }
    };
  }, [isSpeaking]);

  const handleSpeak = () => {
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
    }

    const utterance = new SpeechSynthesisUtterance(message.text);
    
    const latinCount = (message.text.match(/[a-zA-Z]/g) || []).length;
    const isEnglishLikely = latinCount > message.text.length / 2;

    const langMap: Record<string, string> = {
        en: 'en-IN', 
        hi: 'hi-IN', 
        pa: 'pa-IN', 
        bn: 'bn-IN', 
        mr: 'mr-IN', 
        gu: 'gu-IN', 
        te: 'te-IN', 
        kn: 'kn-IN',
        rwr: 'hi-IN', 
        bgc: 'hi-IN', 
        bho: 'hi-IN' 
    };

    utterance.lang = isEnglishLikely ? 'en-IN' : (langMap[language] || 'en-IN');
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }

  const renderTextWithFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|\n)/g).filter(part => part);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index} className="bg-gray-200 text-sm rounded px-1 font-mono">{part.slice(1, -1)}</code>;
      }
      if (part === '\n') {
        return <br key={index} />;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm">
          <RobotIcon className="w-5 h-5" />
        </div>
      )}
      <div className="flex flex-col gap-1 max-w-[85%] md:max-w-lg">
          <div
            className={`rounded-xl p-3 shadow-md ${
              isUser
                ? 'bg-green-700 text-white rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
            }`}
          >
            {message.image && (
              <img src={message.image} alt="User upload" className="rounded-lg mb-2 max-h-64 w-full object-cover" />
            )}
            <div className="prose prose-sm text-inherit whitespace-pre-wrap break-words">{renderTextWithFormatting(message.text)}</div>

            {/* Auto-upgraded shopping links for crops, tools, or treatments mentioned in AI advice */}
            {!isUser && detectedSupplies.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Auto-Upgraded Farm Supplies & Tool Links:</span>
                </div>
                {detectedSupplies.map((item, idx) => (
                  <div key={idx} className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-2.5 text-xs">
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <div className="font-semibold text-emerald-950 flex items-center gap-1.5 truncate">
                        <span>{item.icon}</span>
                        <span className="truncate">{item.name}</span>
                      </div>
                      <span className="text-[10px] bg-emerald-200/60 text-emerald-900 px-1.5 py-0.5 rounded-full font-medium shrink-0">
                        {item.suggestedAction}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      <span className="text-[10px] text-gray-500 font-medium">Auto-Optimized Stores:</span>
                      {(['bighaat', 'agribegri', 'iffcobazar', 'amazon'] as ShoppingPlatformKey[]).map((key) => {
                        const url = item.links[key];
                        const platform = SHOPPING_PLATFORMS[key];
                        if (!url || !platform) return null;
                        return (
                          <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300/80 text-[11px] font-medium transition-colors shadow-2xs"
                          >
                            <span>{platform.name}</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {!isUser && (
             <button 
                onClick={handleSpeak}
                className="self-start text-gray-500 hover:text-green-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={isSpeaking ? "Stop speaking" : "Read aloud"}
             >
                 {isSpeaking ? <StopCircleIcon className="w-5 h-5 text-red-500" /> : <SpeakerIcon className="w-5 h-5" />}
             </button>
          )}
      </div>
       {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0 mt-1 shadow-sm">
          <UserIcon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;