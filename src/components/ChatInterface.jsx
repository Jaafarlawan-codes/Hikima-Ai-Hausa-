import React, { useState } from 'react';
import { User, Sparkles, Volume2, Loader2, History, Globe, Send } from 'lucide-react';
import { translations } from '../constants/translations';

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
        
        // Enhanced markdown parsing
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="bg-gray-200 px-1 py-0.5 rounded text-sm">$1</code>')
            .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
            .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
            .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
            .replace(/^\* (.*$)/gm, '<li class="ml-4">$1</li>')
            .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>');
        
        // Wrap lists in ul tags
        if (html.includes('<li>')) {
            html = html.replace(/(<li.*?>.*?<\/li>)/gs, (match) => {
                if (!match.includes('<ul>') && !match.includes('<ol>')) {
                    return `<ul class="list-disc list-inside space-y-1 my-2">${match}</ul>`;
                }
                return match;
            });
        }
        
        // Handle line breaks
        html = html.replace(/\n/g, '<br>');

        return (
            <div className="flex items-start space-x-4 chat-message">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                    isBotMessage 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                        : 'bg-gradient-to-r from-gray-400 to-gray-600'
                }`}>
                    {isBotMessage ? (
                        <Sparkles className="w-5 h-5 text-white" />
                    ) : (
                        <User className="w-5 h-5 text-white" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div
                        className={`inline-block p-4 rounded-2xl max-w-full shadow-sm ${
                            isBotMessage
                                ? 'bg-white/80 backdrop-blur-sm text-gray-800 border border-gray-200/50'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        }`}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                    {isBotMessage && (
                        <button
                            onClick={() => onReadAloud(text)}
                            className="mt-3 text-xs text-gray-500 hover:text-blue-600 flex items-center transition-colors hover:bg-blue-50 px-2 py-1 rounded-lg"
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {translations[language].appName}
                            </h1>
                            <p className="text-sm text-gray-600 font-medium">
                                {translations[language].welcomeChat(userName)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setShowChatHistory(!showChatHistory)}
                            className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <History className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'ha' : 'en')}
                            className="p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2"
                        >
                            <Globe className="w-5 h-5" />
                            <span className="text-sm font-medium">{language === 'en' ? 'HA' : 'EN'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            {translations[language].welcomeChat(userName)}
                        </h3>
                        <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
                            {translations[language].chatPrompt}
                        </p>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-200/50">
                                <h4 className="font-semibold text-blue-600 mb-2">🤖 AI & Technology</h4>
                                <p className="text-sm text-gray-600">Learn about artificial intelligence and modern technology</p>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-200/50">
                                <h4 className="font-semibold text-purple-600 mb-2">🌍 Bilingual Learning</h4>
                                <p className="text-sm text-gray-600">Get explanations in both Hausa and English</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <div key={index}>
                            {renderMarkdown(message.text, message.sender === 'bot')}
                        </div>
                    ))
                )}

                {isLoading && (
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-gray-200/50">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                        </div>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="p-6 bg-white/80 backdrop-blur-md border-t border-gray-200/50">
                <div className="flex space-x-3 mb-6">
                    <button
                        onClick={onSuggestTopics}
                        disabled={isSuggesting || messages.length === 0}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        {isSuggesting ? (
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        ) : (
                            <Sparkles className="w-5 h-5 mr-2" />
                        )}
                        {translations[language].suggestTopics}
                    </button>
                    <button
                        onClick={onSummarizeChat}
                        disabled={isSummarizing || messages.length === 0}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        {isSummarizing ? (
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        ) : (
                            <History className="w-5 h-5 mr-2" />
                        )}
                        {translations[language].summarizeChat}
                    </button>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="flex space-x-3">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder={translations[language].inputPlaceholder}
                        className="flex-1 px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm text-lg"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputMessage.trim()}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <Send className="w-6 h-6" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;
