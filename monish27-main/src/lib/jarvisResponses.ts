import { SupportedLanguage, detectLanguage, getWakeWordResponse } from './languageDetection';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language?: SupportedLanguage;
}

/**
 * Generates JARVIS response based on user input
 */
export async function generateJarvisResponse(
  userInput: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  const detectedLang = detectLanguage(userInput);
  const lowerInput = userInput.toLowerCase().trim();

  // Handle wake word
  if (lowerInput.includes('jarvis')) {
    return getWakeWordResponse(detectedLang);
  }

  // Handle greetings
  if (/\b(hi|hello|hey|namaste|vanakkam|hola|bonjour|hallo|你好|こんにちは)\b/i.test(userInput)) {
    return getGreeting(detectedLang);
  }

  // Handle resume requests (Tamil-English mixed)
  if (/\b(resume|cv|curriculum|ennaku.*resume|resume.*venum)\b/i.test(userInput)) {
    return getResumeResponse(detectedLang);
  }

  // Handle translation requests
  if (/\b(translate|explain.*in|convert.*to|change.*language)\b/i.test(userInput)) {
    return getTranslationResponse(userInput, detectedLang);
  }

  // Handle coding help
  if (/\b(code|coding|program|function|debug|error|syntax|algorithm)\b/i.test(userInput)) {
    return getCodingResponse(detectedLang);
  }

  // Handle general questions
  if (/\b(what|how|why|when|where|who|explain|tell|help)\b/i.test(userInput)) {
    return getGeneralResponse(userInput, detectedLang);
  }

  // Handle unclear requests
  if (userInput.length < 3) {
    return getClarificationRequest(detectedLang);
  }

  // Default helpful response
  return getDefaultResponse(detectedLang);
}

function getGreeting(lang: SupportedLanguage): string {
  const greetings: Record<SupportedLanguage, string> = {
    en: "Hello! How can I assist you today?",
    ta: "வணக்கம்! இன்று நான் எப்படி உங்களுக்கு உதவ முடியும்?",
    hi: "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूँ?",
    es: "¡Hola! ¿Cómo puedo ayudarte hoy?",
    fr: "Bonjour! Comment puis-je vous aider aujourd'hui?",
    de: "Hallo! Wie kann ich Ihnen heute helfen?",
    zh: "你好！今天我能为您做些什么？",
    ja: "こんにちは！今日はどのようにお手伝いできますか？",
  };
  return greetings[lang] || greetings.en;
}

function getResumeResponse(lang: SupportedLanguage): string {
  const responses: Record<SupportedLanguage, string> = {
    en: "Sure! Are you a fresher or experienced?",
    ta: "நிச்சயமாக! நீங்கள் புதியவரா அல்லது அனுபவமுள்ளவரா?",
    hi: "ज़रूर! आप फ्रेशर हैं या अनुभवी?",
    es: "¡Por supuesto! ¿Eres principiante o con experiencia?",
    fr: "Bien sûr! Êtes-vous débutant ou expérimenté?",
    de: "Sicher! Sind Sie Anfänger oder erfahren?",
    zh: "当然！您是新手还是有经验？",
    ja: "もちろん！あなたは初心者ですか、それとも経験者ですか？",
  };
  return responses[lang] || responses.en;
}

function getTranslationResponse(input: string, lang: SupportedLanguage): string {
  const responses: Record<SupportedLanguage, string> = {
    en: "I'll help you translate. What would you like to translate?",
    ta: "நான் மொழிபெயர்க்க உதவுகிறேன். நீங்கள் எதை மொழிபெயர்க்க விரும்புகிறீர்கள்?",
    hi: "मैं आपकी अनुवाद में मदद करूंगा। आप क्या अनुवाद करना चाहेंगे?",
    es: "Te ayudo a traducir. ¿Qué te gustaría traducir?",
    fr: "Je vous aiderai à traduire. Que souhaitez-vous traduire?",
    de: "Ich helfe Ihnen beim Übersetzen. Was möchten Sie übersetzen?",
    zh: "我会帮您翻译。您想翻译什么？",
    ja: "翻訳をお手伝いします。何を翻訳したいですか？",
  };
  return responses[lang] || responses.en;
}

function getCodingResponse(lang: SupportedLanguage): string {
  const responses: Record<SupportedLanguage, string> = {
    en: "I can help with coding. What programming language or problem are you working on?",
    ta: "நான் குறியீட்டில் உதவ முடியும். நீங்கள் எந்த நிரலாக்க மொழி அல்லது சிக்கலில் பணிபுரிகிறீர்கள்?",
    hi: "मैं कोडिंग में मदद कर सकता हूँ। आप किस प्रोग्रामिंग भाषा या समस्या पर काम कर रहे हैं?",
    es: "Puedo ayudar con la programación. ¿En qué lenguaje de programación o problema estás trabajando?",
    fr: "Je peux aider en programmation. Sur quel langage de programmation ou problème travaillez-vous?",
    de: "Ich kann bei der Programmierung helfen. An welcher Programmiersprache oder welchem Problem arbeiten Sie?",
    zh: "我可以帮助编程。您正在使用哪种编程语言或处理什么问题？",
    ja: "コーディングをお手伝いできます。どのプログラミング言語や問題に取り組んでいますか？",
  };
  return responses[lang] || responses.en;
}

function getGeneralResponse(input: string, lang: SupportedLanguage): string {
  const responses: Record<SupportedLanguage, string> = {
    en: "I understand. Let me help you with that. Could you provide more details?",
    ta: "நான் புரிந்துகொண்டேன். அதில் நான் உங்களுக்கு உதவுகிறேன். மேலும் விவரங்களை வழங்க முடியுமா?",
    hi: "मैं समझ गया। मैं आपकी उसमें मदद करता हूँ। क्या आप अधिक विवरण दे सकते हैं?",
    es: "Entiendo. Déjame ayudarte con eso. ¿Podrías proporcionar más detalles?",
    fr: "Je comprends. Laissez-moi vous aider avec cela. Pourriez-vous fournir plus de détails?",
    de: "Ich verstehe. Lassen Sie mich Ihnen dabei helfen. Könnten Sie mehr Details angeben?",
    zh: "我明白了。让我帮您解决这个问题。您能提供更多详细信息吗？",
    ja: "理解しました。それについてお手伝いします。詳細を教えていただけますか？",
  };
  return responses[lang] || responses.en;
}

function getClarificationRequest(lang: SupportedLanguage): string {
  const responses: Record<SupportedLanguage, string> = {
    en: "Could you please clarify what you need?",
    ta: "நீங்கள் என்ன தேவை என்பதை தெளிவுபடுத்த முடியுமா?",
    hi: "क्या आप कृपया स्पष्ट कर सकते हैं कि आपको क्या चाहिए?",
    es: "¿Podrías aclarar qué necesitas?",
    fr: "Pourriez-vous préciser ce dont vous avez besoin?",
    de: "Könnten Sie bitte klären, was Sie brauchen?",
    zh: "您能说明一下您需要什么吗？",
    ja: "何が必要か明確にしていただけますか？",
  };
  return responses[lang] || responses.en;
}

function getDefaultResponse(lang: SupportedLanguage): string {
  const responses: Record<SupportedLanguage, string> = {
    en: "I'm here to help. How can I assist you?",
    ta: "நான் உதவ இங்கே இருக்கிறேன். நான் எப்படி உங்களுக்கு உதவ முடியும்?",
    hi: "मैं मदद के लिए यहाँ हूँ। मैं आपकी कैसे मदद कर सकता हूँ?",
    es: "Estoy aquí para ayudar. ¿Cómo puedo asistirte?",
    fr: "Je suis là pour aider. Comment puis-je vous assister?",
    de: "Ich bin hier, um zu helfen. Wie kann ich Ihnen helfen?",
    zh: "我在这里为您提供帮助。我能为您做些什么？",
    ja: "お手伝いするためにここにいます。どのようにお手伝いできますか？",
  };
  return responses[lang] || responses.en;
}

