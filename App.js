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

// Login Component
const LoginForm = ({ onLogin, onSwitchToSignup, language, setLanguage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {translations[language].welcomeBack}
                        </h1>
                        <p className="text-gray-600">
                            {translations[language].signInToAccount}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={translations[language].emailPlaceholder}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={translations[language].passwordPlaceholder}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                        >
                            <LogIn className="w-5 h-5 mr-2" />
                            {translations[language].signIn}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            {translations[language].noAccount}{' '}
                            <button
                                onClick={onSwitchToSignup}
                                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                            >
                                {translations[language].signUp}
                            </button>
                        </p>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'ha' : 'en')}
                            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <Globe className="w-4 h-4 mr-2" />
                            {translations[language].languageToggle}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Signup Component
const SignupForm = ({ onSignup, onSwitchToLogin, language, setLanguage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignup(name, email, password);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {translations[language].createAccount}
                        </h1>
                        <p className="text-gray-600">
                            {translations[language].getStarted}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={translations[language].namePlaceholder}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={translations[language].emailPlaceholder}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={translations[language].passwordPlaceholder}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                        >
                            <User className="w-5 h-5 mr-2" />
                            {translations[language].signUp}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            {translations[language].alreadyAccount}{' '}
                            <button
                                onClick={onSwitchToLogin}
                                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                            >
                                {translations[language].signIn}
                            </button>
                        </p>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'ha' : 'en')}
                            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <Globe className="w-4 h-4 mr-2" />
                            {translations[language].languageToggle}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Chat Component
const ChatInterface = ({ 
    messages, 
    onSendMessage, 
    onSuggestTopics, 
    onSummarizeChat, 
    onReadAloud,
    isLoading, 
    isSuggesting, 
    isSummarizing,
    language, 
    setLanguage, 
    userName 
}) => {
    const [inputMessage, setInputMessage] = useState('');
    const [showChatHistory, setShowChatHistory] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            onSendMessage(inputMessage);
            setInputMessage('');
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
            <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isBotMessage ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-300'
                }`}>
                    {isBotMessage ? (
                        <Sparkles className="w-4 h-4 text-white" />
                    ) : (
                        <User className="w-4 h-4 text-gray-600" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div 
                        className={`inline-block p-3 rounded-lg max-w-full ${
                            isBotMessage 
                                ? 'bg-gray-100 text-gray-800' 
                                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        }`}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                    {isBotMessage && (
                        <button
                            onClick={() => onReadAloud(text)}
                            className="mt-2 text-xs text-gray-500 hover:text-blue-600 flex items-center transition-colors"
                        >
                            <Volume2 className="w-3 h-3 mr-1" />
                            {translations[language].readAloud}
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                {translations[language].appName}
                            </h1>
                            <p className="text-sm text-gray-600">
                                {translations[language].welcomeChat(userName)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setShowChatHistory(!showChatHistory)}
                            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <History className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'ha' : 'en')}
                            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Globe className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {translations[language].welcomeChat(userName)}
                        </h3>
                        <p className="text-gray-600">
                            {translations[language].chatPrompt}
                        </p>
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <div key={index}>
                            {renderMarkdown(message.text, message.sender === 'bot')}
                        </div>
                    ))
                )}
                
                {isLoading && (
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg">
                            <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                        </div>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex space-x-2 mb-4">
                    <button
                        onClick={onSuggestTopics}
                        disabled={isSuggesting || messages.length === 0}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isSuggesting ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                            <Sparkles className="w-4 h-4 mr-2" />
                        )}
                        {translations[language].suggestTopics}
                    </button>
                    <button
                        onClick={onSummarizeChat}
                        disabled={isSummarizing || messages.length === 0}
                        className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isSummarizing ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                            <History className="w-4 h-4 mr-2" />
                        )}
                        {translations[language].summarizeChat}
                    </button>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="flex space-x-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder={translations[language].inputPlaceholder}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputMessage.trim()}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

// Message Box Component
const MessageBox = () => (
    <div id="message-box" className="message-box fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full opacity-0">
    </div>
);

export default function App() {
    const [currentPage, setCurrentPage] = useState('login');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [language, setLanguage] = useState('en');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const showMessageBox = (message, type) => {
        const messageBox = document.getElementById('message-box');
        if (messageBox) {
            messageBox.textContent = message;
            messageBox.className = `message-box fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
                type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            } transform translate-x-0 opacity-100`;
            setTimeout(() => {
                messageBox.className = 'message-box fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full opacity-0';
            }, 3000);
        }
    };

    const handleLogin = (email, password) => {
        if (email.trim() === '' || password.trim() === '') {
            showMessageBox(translations[language].enterEmailPassword, 'error');
            return;
        }
        setUserName('Guest');
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

        // Simulate API call with a mock response for demo purposes
        setTimeout(() => {
            const botResponse = {
                sender: 'bot',
                text: `Thank you for your question about "${message}". This is a demo response. In a real implementation, this would connect to an AI API to provide helpful information about technology and AI topics.`
            };
            setMessages(prevMessages => [...prevMessages, botResponse]);
            setIsLoading(false);
        }, 1500);
    };

    const handleSuggestTopics = async () => {
        const lastUserMessage = messages.filter(msg => msg.sender === 'user').pop();
        if (!lastUserMessage) {
            showMessageBox(translations[language].noPreviousMessage, 'error');
            return;
        }

        setIsSuggesting(true);
        setTimeout(() => {
            const topics = ['Machine Learning Basics', 'Web Development Trends', 'AI Ethics'];
            const suggestionText = translations[language].suggestionPrompt(topics);
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: suggestionText }]);
            setIsSuggesting(false);
        }, 1000);
    };
    
    const handleSummarizeChat = async () => {
        if (messages.length === 0) {
            showMessageBox(translations[language].noChatToSummarize, 'error');
            return;
        }

        setIsSummarizing(true);
        setTimeout(() => {
            const summary = "**Summary:**\nThis conversation covered various topics related to technology and AI learning. The user asked questions and received informative responses about different aspects of tech and artificial intelligence.";
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: summary }]);
            setIsSummarizing(false);
        }, 1000);
    };

    const handleReadAloud = async (text) => {
        showMessageBox(translations[language].readingAloud, 'success');
        // In a real implementation, this would use text-to-speech API
        console.log('Reading aloud:', text);
    };

    return (
        <div className="App">
            <MessageBox />
            {currentPage === 'login' && (
                <LoginForm
                    onLogin={handleLogin}
                    onSwitchToSignup={() => setCurrentPage('signup')}
                    language={language}
                    setLanguage={setLanguage}
                />
            )}
            {currentPage === 'signup' && (
                <SignupForm
                    onSignup={handleSignup}
                    onSwitchToLogin={() => setCurrentPage('login')}
                    language={language}
                    setLanguage={setLanguage}
                />
            )}
            {currentPage === 'chatbot' && (
                <ChatInterface
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    onSuggestTopics={handleSuggestTopics}
                    onSummarizeChat={handleSummarizeChat}
                    onReadAloud={handleReadAloud}
                    isLoading={isLoading}
                    isSuggesting={isSuggesting}
                    isSummarizing={isSummarizing}
                    language={language}
                    setLanguage={setLanguage}
                    userName={userName}
                />
            )}
        </div>
    );
}