import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, MicOff, Send, Volume2, VolumeX, Bot, User } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { 
  detectLanguage, 
  containsWakeWord, 
  removeWakeWord,
  getWakeWordResponse,
  SupportedLanguage 
} from '@/lib/languageDetection';
import { generateJarvisResponse, ChatMessage } from '@/lib/jarvisResponses';

export function Jarvis() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [wakeWordDetected, setWakeWordDetected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<ChatMessage[]>([]);

  // Keep messagesRef in sync with messages state
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const handleSendMessageRef = useRef<((messageText?: string) => Promise<void>) | null>(null);

  const handleSpeechResult = useCallback((text: string, isFinal: boolean) => {
    if (text && !isProcessing) {
      setInput(text);
      if (isFinal && handleSendMessageRef.current) {
        handleSendMessageRef.current(text);
      }
    }
  }, [isProcessing]);

  const { 
    transcript, 
    isListening: isRecognitionListening,
    isSupported: isRecognitionSupported,
    startListening: startRecognition,
    stopListening: stopRecognition,
    resetTranscript 
  } = useSpeechRecognition({
    continuous: true,
    interimResults: true,
    lang: currentLanguage === 'ta' ? 'ta-IN' : currentLanguage === 'hi' ? 'hi-IN' : `${currentLanguage}-US`,
    onResult: handleSpeechResult,
    onError: (error) => {
      console.error('Speech recognition error:', error);
      setIsListening(false);
    },
  });

  const { 
    speak, 
    stop: stopSpeaking, 
    isSpeaking,
    isSupported: isSynthesisSupported 
  } = useSpeechSynthesis({
    lang: currentLanguage === 'ta' ? 'ta-IN' : currentLanguage === 'hi' ? 'hi-IN' : `${currentLanguage}-US`,
    rate: 1,
    pitch: 1,
    volume: 1,
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Wake word detection in transcript
  useEffect(() => {
    if (transcript && containsWakeWord(transcript) && !isProcessing) {
      setWakeWordDetected(true);
      const cleanedInput = removeWakeWord(transcript);
      if (cleanedInput.trim()) {
        setInput(cleanedInput);
        handleSendMessage(cleanedInput);
      } else {
        // Just wake word, respond with greeting
        const lang = detectLanguage(transcript);
        setCurrentLanguage(lang);
        const response = getWakeWordResponse(lang);
        addAssistantMessage(response, lang);
        if (voiceEnabled && isSynthesisSupported) {
          speak(response, { lang: lang === 'ta' ? 'ta-IN' : lang === 'hi' ? 'hi-IN' : `${lang}-US` });
        }
      }
      resetTranscript();
      setTimeout(() => setWakeWordDetected(false), 2000);
    }
  }, [transcript, handleSendMessage, addAssistantMessage, voiceEnabled, isSynthesisSupported, speak, resetTranscript, isProcessing]);

  const addMessage = useCallback((content: string, role: 'user' | 'assistant', language?: SupportedLanguage) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
      language: language || detectLanguage(content),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const addAssistantMessage = useCallback((content: string, language?: SupportedLanguage) => {
    return addMessage(content, 'assistant', language);
  }, [addMessage]);

  const addUserMessage = useCallback((content: string) => {
    return addMessage(content, 'user');
  }, [addMessage]);

  const handleSendMessage = useCallback(async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isProcessing) return;

    setIsProcessing(true);
    
    // Detect language from user input
    const detectedLang = detectLanguage(text);
    setCurrentLanguage(detectedLang);

    // Create user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      language: detectedLang,
    };

    // Add user message to state immediately
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    resetTranscript();

    // Generate and add assistant response
    try {
      // Use messagesRef to get current conversation history
      const conversationHistory = [...messagesRef.current, userMessage];
      const response = await generateJarvisResponse(text, conversationHistory);
      const responseLang = detectLanguage(response);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        language: responseLang,
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Speak response if voice is enabled
      if (voiceEnabled && isSynthesisSupported) {
        const langCode = responseLang === 'ta' ? 'ta-IN' : responseLang === 'hi' ? 'hi-IN' : `${responseLang}-US`;
        speak(response, { lang: langCode });
      }
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMsg = detectedLang === 'ta' 
        ? 'மன்னிக்கவும், பிழை ஏற்பட்டது.' 
        : detectedLang === 'hi'
        ? 'क्षमा करें, एक त्रुटि हुई।'
        : 'Sorry, an error occurred.';
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorMsg,
        timestamp: new Date(),
        language: detectedLang,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  }, [input, voiceEnabled, isSynthesisSupported, speak, resetTranscript, isProcessing]);

  // Update ref when handleSendMessage changes
  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage;
  }, [handleSendMessage]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    if (isRecognitionListening) {
      stopRecognition();
      setIsListening(false);
    } else {
      startRecognition();
      setIsListening(true);
    }
  };

  const toggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
    setVoiceEnabled(!voiceEnabled);
  };

  // Initialize with welcome message - only once
  useEffect(() => {
    const welcomeShown = localStorage.getItem('jarvis-welcome-shown');
    if (isOpen && messages.length === 0 && !welcomeShown) {
      const welcomeMsg = currentLanguage === 'ta'
        ? 'வணக்கம்! நான் JARVIS. நான் எப்படி உங்களுக்கு உதவ முடியும்?'
        : currentLanguage === 'hi'
        ? 'नमस्ते! मैं JARVIS हूँ। मैं आपकी कैसे मदद कर सकता हूँ?'
        : 'Hello! I\'m JARVIS. How can I help you?';
      addAssistantMessage(welcomeMsg, currentLanguage);
      localStorage.setItem('jarvis-welcome-shown', 'true');
    }
  }, [isOpen, currentLanguage, messages.length, addAssistantMessage]);

  return (
    <>
      {/* Floating JARVIS Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform"
        size="icon"
        variant="default"
      >
        <Bot className="h-6 w-6" />
      </Button>

      {/* JARVIS Chat Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="w-full max-w-2xl h-[600px] flex flex-col shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                <CardTitle>JARVIS Assistant</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleVoice}
                  title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
                >
                  {voiceEnabled ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <VolumeX className="h-4 w-4" />
                  )}
                </Button>
                {isRecognitionSupported && (
                  <Button
                    variant={isListening ? 'default' : 'outline'}
                    size="icon"
                    onClick={toggleListening}
                    title={isListening ? 'Stop listening' : 'Start listening'}
                  >
                    {isListening ? (
                      <Mic className="h-4 w-4" />
                    ) : (
                      <MicOff className="h-4 w-4" />
                    )}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsOpen(false);
                    stopRecognition();
                    stopSpeaking();
                  }}
                >
                  ×
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      {message.role === 'user' && (
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isListening && (
                    <div className="flex gap-3 justify-start">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mic className="h-4 w-4 text-primary animate-pulse" />
                      </div>
                      <div className="bg-muted rounded-lg px-4 py-2">
                        <p className="text-sm text-muted-foreground italic">
                          {transcript || 'Listening...'}
                        </p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      currentLanguage === 'ta'
                        ? 'உங்கள் செய்தியை உள்ளிடவும்...'
                        : currentLanguage === 'hi'
                        ? 'अपना संदेश दर्ज करें...'
                        : 'Type your message...'
                    }
                    className="flex-1"
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isProcessing}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  {wakeWordDetected && (
                    <span className="animate-pulse">Wake word detected! Listening...</span>
                  )}
                  {isProcessing && (
                    <span className="animate-pulse">Processing...</span>
                  )}
                  {!isRecognitionSupported && (
                    <span>Voice input not supported in this browser</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

