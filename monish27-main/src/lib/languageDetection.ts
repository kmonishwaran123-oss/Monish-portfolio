/**
 * Language Detection and Translation Utilities
 * Detects user language and provides multilingual support
 */

export type SupportedLanguage = 'en' | 'ta' | 'hi' | 'es' | 'fr' | 'de' | 'zh' | 'ja';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageInfo> = {
  en: { code: 'en', name: 'English', nativeName: 'English' },
  ta: { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français' },
  de: { code: 'de', name: 'German', nativeName: 'Deutsch' },
  zh: { code: 'zh', name: 'Chinese', nativeName: '中文' },
  ja: { code: 'ja', name: 'Japanese', nativeName: '日本語' },
};

/**
 * Detects language from text input
 * Uses simple heuristics and keyword matching
 */
export function detectLanguage(text: string): SupportedLanguage {
  const lowerText = text.toLowerCase().trim();
  
  // Tamil detection
  if (/[\u0B80-\u0BFF]/.test(text) || 
      /\b(ennaku|unga|naan|neenga|illai|venum|irukku|pannu|sollu)\b/i.test(lowerText)) {
    return 'ta';
  }
  
  // Hindi detection
  if (/[\u0900-\u097F]/.test(text) || 
      /\b(मैं|आप|है|हूँ|कर|क्या|कैसे|कहाँ|कब|क्यों)\b/i.test(lowerText)) {
    return 'hi';
  }
  
  // Spanish detection
  if (/\b(hola|gracias|por favor|sí|no|qué|cómo|dónde|cuándo|por qué)\b/i.test(lowerText)) {
    return 'es';
  }
  
  // French detection
  if (/\b(bonjour|merci|s'il vous plaît|oui|non|quoi|comment|où|quand|pourquoi)\b/i.test(lowerText)) {
    return 'fr';
  }
  
  // German detection
  if (/\b(hallo|danke|bitte|ja|nein|was|wie|wo|wann|warum)\b/i.test(lowerText)) {
    return 'de';
  }
  
  // Chinese detection
  if (/[\u4E00-\u9FFF]/.test(text)) {
    return 'zh';
  }
  
  // Japanese detection
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) {
    return 'ja';
  }
  
  // Default to English
  return 'en';
}

/**
 * Gets wake word response in user's language
 */
export function getWakeWordResponse(language: SupportedLanguage): string {
  const responses: Record<SupportedLanguage, string> = {
    en: "Yes, how can I help you?",
    ta: "ஆம், நான் எப்படி உங்களுக்கு உதவ முடியும்?",
    hi: "हाँ, मैं आपकी कैसे मदद कर सकता हूँ?",
    es: "Sí, ¿cómo puedo ayudarte?",
    fr: "Oui, comment puis-je vous aider?",
    de: "Ja, wie kann ich Ihnen helfen?",
    zh: "是的，我能为您做些什么？",
    ja: "はい、どのようにお手伝いできますか？",
  };
  
  return responses[language] || responses.en;
}

/**
 * Checks if text contains wake word "Jarvis" (case-insensitive)
 */
export function containsWakeWord(text: string): boolean {
  return /\bjarvis\b/i.test(text);
}

/**
 * Removes wake word from text
 */
export function removeWakeWord(text: string): string {
  return text.replace(/\bjarvis\b/gi, '').trim();
}

