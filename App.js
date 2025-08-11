import React, { useState, useEffect } from 'react';
import { Mail, Lock, LogIn, User, Settings, Globe, Mic, Send, History, Plus, X, Sparkles, Volume2, Loader2 } from 'lucide-react';

// --- Translation data ---
const translations = {
    en: {
        appName: "Tech & AI Learning",
        signIn: "Sign In",
        signUp: "Sign Up",
        welcomeBack: "Welcome Back",
        signInToAccount: "Sign in to your account",
        createAccount: "Create an Account",
        getStarted: "Sign up to get started",
        emailPlaceholder: "Enter your email",
        passwordPlaceholder: "Enter your password",
        namePlaceholder: "Enter your full name",
        magicLink: "Or use magic link",
        alreadyAccount: "Already have an account?",
        noAccount: "Don't have an account?",
        chatHistory: "Chat History",
        newChat: "New Chat",
        noChatHistory: "No chat history",
        welcomeChat: (name) => `Welcome ${name}! I'm ready to help you learn tech and AI.`,
        chatPrompt: "Choose a learning topic or ask me anything.",
        inputPlaceholder: "Ask about tech or AI...",
        voicePrompt: "Tap microphone to speak",
        languageToggle: "Canza zuwa Hausa",
        languageHausa: "Hausa",
        languageEnglish: "English",
        loginSuccess: "Login successful! Redirecting to chat...",
        signupSuccess: "Sign up successful! Redirecting to chat...",
        fillAllFields: "Please fill out all fields.",
        enterEmailPassword: "Please enter both email and password.",
        sorryResponse: "Sorry, I could not generate a response.",
        apiError: "I am currently unable to respond. Please try again later.",
        voiceActivated: "Voice dictation activated. Start speaking...",
        suggestTopics: "✨ Suggest Topics",
        suggestionPrompt: (topics) => `Based on our conversation, you might also be interested in these topics:\n${topics.map(t => `* ${t}`).join('\n')}`,
        noPreviousMessage: "Please send a message first to get suggestions.",
        generatingSuggestions: "Generating suggestions...",
        summarizeChat: "✨ Summarize Chat",
        noChatToSummarize: "There are no messages to summarize.",
        generatingSummary: "Generating summary...",
        readAloud: "Read Aloud",
        readingAloud: "Reading aloud...",
    },
    ha: {
        appName: "Koyo da AI",
        signIn: "Shiga",
        signUp: "Bude Sabon",
        welcomeBack: "Barka da dawowa",
        signInToAccount: "Shiga asusunka",
        createAccount: "Bude Sabon Asusunka",
        getStarted: "Bude Sabon don farawa",
        emailPlaceholder: "Shigar da email dinka",
        passwordPlaceholder: "Shigar da kalmar sirri",
        namePlaceholder: "Shigar da cikakken sunanka",
        magicLink: "Ko amfani da hanyar sihiri",
        alreadyAccount: "Kun riga kuna da asusu?",
        noAccount: "Babu asusu?",
        chatHistory: "Tarihin Tattaunawa",
        newChat: "Sabon Tattaunawa",
        noChatHistory: "Babu tarihin tattaunawa",
        welcomeChat: (name) => `Barka da zuwa ${name}! Ina shirye don taimaka maka koyo game da fasaha da AI.`,
        chatPrompt: "Zabi batun koyo ko tambaye ni komai.",
        inputPlaceholder: "Tambaye game da fasaha ko AI...",
        voicePrompt: "Danna microphone don magana",
        languageToggle: "Switch to English",
        languageHausa: "Hausa",
        languageEnglish: "Turanci",
        loginSuccess: "An yi nasarar shiga! Ana tura ku zuwa tattaunawa...",
        signupSuccess: "An yi nasarar bude sabon! Ana tura ku zuwa tattaunawa...",
        fillAllFields: "Don Allah cika duk filayen.",
        enterEmailPassword: "Don Allah shigar da duka email da kalmar sirri.",
        sorryResponse: "Sori, ban iya bayar da amsa ba.",
        apiError: "A halin yanzu ba zan iya amsa ba. Don Allah gwada daga baya.",
        voiceActivated: "An kunna umarnin murya. Fara magana...",
        suggestTopics: "✨ Nemi batutuwa",
        suggestionPrompt: (topics) => `Bisa ga tattaunawarmu, za ka iya kuma sha'awar waɗannan batutuwa:\n${topics.map(t => `* ${t}`).join('\n')}`,
        noPreviousMessage: "Don Allah aika saƙo da farko don samun shawarwari.",
        generatingSuggestions: "Ana samar da shawarwari...",
        summarizeChat: "✨ Takaita Tattaunawa",
        noChatToSummarize: "Babu saƙonni da za a takaita.",
        generatingSummary: "Ana samar da takaitawa...",
        readAloud: "Karanta da babbar murya",
        readingAloud: "Ana karantawa...",
    }
};

export default function App() {
    const [currentPage, setCurrentPage] = useState('login');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [showChatHistory, setShowChatHistory] = useState(false);
    const [language, setLanguage] = useState('en');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const showMessageBox = (message, type) => {
        const messageBox = document.getElementById('message-box');
        if (messageBox) {
            messageBox.textContent = message;
            messageBox.className = `message-box show ${type}`;
            setTimeout(() => {
                messageBox.className = 'message-box';
            }, 3000);
        }
    };

    const handleLogin = (email, password) => {
        if (email.trim() === '' || password.trim() === '') {
            showMessageBox(translations[language].enterEmailPassword, 'error');
            return;
        }
        setUserName('Guest'); // Default name for login
        setUserEmail(email);
        setCurrentPage('chatbot');
        showMessageBox(translations[language].loginSuccess, 'success');
    };

    const handleSignup = (name, email, password) => {
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            showMessageBox(translations[language].fillAllFields, 'error');
            return;
        }
        setUserName(name);
        setUserEmail(email);
        setCurrentPage('chatbot');
        showMessageBox(translations[language].signupSuccess, 'success');
    };

    const handleSendMessage = async (message) => {
        if (message.trim() === '') return;
        const userMessage = { sender: 'user', text: message };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setIsLoading(true);

        const prompt = message;
        let retries = 0;
        const maxRetries = 5;
        let delay = 1000;

        while (retries < maxRetries) {
            try {
                const chatHistory = [];
                chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                const payload = { contents: chatHistory };
                const apiKey = "";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    const botResponse = result.candidates[0].content.parts[0].text;
                    setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
                } else {
                    console.error('Unexpected API response structure:', result);
                    setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: translations[language].sorryResponse }]);
                }
                break;
            } catch (error) {
                console.error('API call failed:', error);
                retries++;
                if (retries < maxRetries) {
                    await new Promise(res => setTimeout(res, delay));
                    delay *= 2;
                } else {
                    setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: translations[language].apiError }]);
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSuggestTopics = async () => {
        const lastUserMessage = messages.filter(msg => msg.sender === 'user').pop();
        if (!lastUserMessage) {
            showMessageBox(translations[language].noPreviousMessage, 'error');
            return;
        }

        const suggestionMessage = { sender: 'bot', text: translations[language].generatingSuggestions };
        setMessages(prevMessages => [...prevMessages, suggestionMessage]);
        setIsSuggesting(true);

        let retries = 0;
        const maxRetries = 5;
        let delay = 1000;

        while (retries < maxRetries) {
            try {
                const prompt = `The user is discussing the following topic: "${lastUserMessage.text}". Generate a JSON array of three related but distinct learning topic suggestions. The JSON should have a key 'suggestions' with an array of three strings. For example: {"suggestions": ["Topic 1", "Topic 2", "Topic 3"]}`;
                const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
                const payload = {
                    contents: chatHistory,
                    generationConfig: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: "OBJECT",
                            properties: {
                                "suggestions": {
                                    "type": "ARRAY",
                                    "items": { "type": "STRING" }
                                }
                            }
                        }
                    }
                };
                const apiKey = "";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                const json = result?.candidates?.[0]?.content?.parts?.[0]?.text;
                const parsedJson = JSON.parse(json);
                const topics = parsedJson.suggestions;

                setMessages(prevMessages => {
                    const updatedMessages = prevMessages.filter(msg => msg.text !== translations[language].generatingSuggestions);
                    const newBotMessage = { sender: 'bot', text: translations[language].suggestionPrompt(topics) };
                    return [...updatedMessages, newBotMessage];
                });
                break;
            } catch (error) {
                console.error('API call for suggestions failed:', error);
                retries++;
                if (retries < maxRetries) {
                    await new Promise(res => setTimeout(res, delay));
                    delay *= 2;
                } else {
                    setMessages(prevMessages => {
                        const updatedMessages = prevMessages.filter(msg => msg.text !== translations[language].generatingSuggestions);
                        return [...updatedMessages, { sender: 'bot', text: translations[language].apiError }];
                    });
                }
            } finally {
                setIsSuggesting(false);
            }
        }
    };
    
    const handleSummarizeChat = async () => {
        if (messages.length === 0) {
            showMessageBox(translations[language].noChatToSummarize, 'error');
            return;
        }

        const summaryMessage = { sender: 'bot', text: translations[language].generatingSummary };
        setMessages(prevMessages => [...prevMessages, summaryMessage]);
        setIsSummarizing(true);

        const chatHistoryText = messages.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
        const prompt = `Summarize the following chat conversation into key points:\n\n${chatHistoryText}`;

        let retries = 0;
        const maxRetries = 5;
        let delay = 1000;

        while (retries < maxRetries) {
            try {
                const chatHistory = [];
                chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                const payload = { contents: chatHistory };
                const apiKey = "";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                const summary = result?.candidates?.[0]?.content?.parts?.[0]?.text;

                setMessages(prevMessages => {
                    const updatedMessages = prevMessages.filter(msg => msg.text !== translations[language].generatingSummary);
                    const newBotMessage = { sender: 'bot', text: `**Summary:**\n${summary}` };
                    return [...updatedMessages, newBotMessage];
                });
                break;
            } catch (error) {
                console.error('API call for summary failed:', error);
                retries++;
                if (retries < maxRetries) {
                    await new Promise(res => setTimeout(res, delay));
                    delay *= 2;
                } else {
                    setMessages(prevMessages => {
                        const updatedMessages = prevMessages.filter(msg => msg.text !== translations[language].generatingSummary);
                        return [...updatedMessages, { sender: 'bot', text: translations[language].apiError }];
                    });
                }
            } finally {
                setIsSummarizing(false);
            }
        }
    };

    const handleReadAloud = async (text) => {
        showMessageBox(translations[language].readingAloud, 'success');
        const prompt = `Say in a friendly and informative tone: ${text}`;
        
        const base64ToArrayBuffer = (base64) => {
            const binaryString = atob(base64);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return bytes.buffer;
        };
    
        const pcmToWav = (pcmData, sampleRate) => {
            const dataLength = pcmData.length * 2;
            const buffer = new ArrayBuffer(44 + dataLength);
            const view = new DataView(buffer);
            let offset = 0;
        
            const writeString = (str) => {
                for (let i = 0; i < str.length; i++) {
                    view.setUint8(offset++, str.charCodeAt(i));
                }
            };
        
            writeString('RIFF');
            view.setUint32(offset, 36 + dataLength, true); offset += 4;
            writeString('WAVE');
            writeString('fmt ');
            view.setUint32(offset, 16, true); offset += 4; // Sub-chunk 1 size
            view.setUint16(offset, 1, true); offset += 2; // Audio format (PCM)
            view.setUint16(offset, 1, true); offset += 2; // Num channels
            view.setUint32(offset, sampleRate, true); offset += 4; // Sample rate
            view.setUint32(offset, sampleRate * 2, true); offset += 4; // Byte rate
            view.setUint16(offset, 2, true); offset += 2; // Block align
            view.setUint16(offset, 16, true); offset += 2; // Bits per sample
            writeString('data');
            view.setUint32(offset, dataLength, true); offset += 4;
        
            const pcm16 = new Int16Array(buffer, offset);
            pcm16.set(pcmData);
        
            return new Blob([buffer], { type: 'audio/wav' });
        };
    
        let retries = 0;
        const maxRetries = 5;
        let delay = 1000;

        while (retries < maxRetries) {
            try {
                const payload = {
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    generationConfig: {
                        responseModalities: ["AUDIO"],
                        speechConfig: {
                            voiceConfig: {
                                prebuiltVoiceConfig: { voiceName: "Puck" }
                            }
                        }
                    },
                    model: "gemini-2.5-flash-preview-tts"
                };
                const apiKey = "";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                const part = result?.candidates?.[0]?.content?.parts?.[0];
                const audioData = part?.inlineData?.data;
                const mimeType = part?.inlineData?.mimeType;

                if (audioData && mimeType && mimeType.startsWith("audio/")) {
                    const sampleRate = parseInt(mimeType.match(/rate=(\d+)/)[1], 10);
                    const pcmData = base64ToArrayBuffer(audioData);
                    const pcm16 = new Int16Array(pcmData);
                    const wavBlob = pcmToWav(pcm16, sampleRate);
                    const audioUrl = URL.createObjectURL(wavBlob);
                    
                    const audio = new Audio(audioUrl);
                    audio.play();
                } else {
                    showMessageBox("Failed to generate audio.", 'error');
                }
                break;
            } catch (error) {
                console.error('TTS API call failed:', error);
                retries++;
                if (retries < maxRetries) {
                    await new Promise(res => setTimeout(res, delay));
                    delay *= 2;
                } else {
                    showMessageBox(translations[language].apiError, 'error');
                }
            }
        }
    };
    
    const renderMarkdown = (text, isBotMessage) => {
        if (!text) return null;
        let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\* (.*)/g, '<li>$1</li>');
        if (html.includes('<li>')) {
            html = `<ul>${html}</ul>`;
        }
    
        return (
            <div className="flex items-start">
                <div className="flex-1" dangerously