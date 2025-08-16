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
            <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isBotMessage ? 'bg-black' : 'bg-gray-200'
                }`}>
                    {isBotMessage ? (
                        <Sparkles className="w-4 h-4 text-white" />
                    ) : (
                        <User className="w-4 h-4 text-black" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div
                        className={`inline-block p-3 rounded-lg max-w-full ${
                            isBotMessage
                                ? 'bg-gray-100 text-black'
                                : 'bg-black text-white'
                        }`}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                    {isBotMessage && (
                        <button
                            onClick={() => onReadAloud(text)}
                            className="mt-2 text-xs text-gray-500 hover:text-black flex items-center transition-colors"
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
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-black">
                                {translations[language].appName}
                            </h1>
                            <p className="text-sm text-gray-500">
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
                        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                            {translations[language].welcomeChat(userName)}
                        </h3>
                        <p className="text-gray-500">
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
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg">
                            <Loader2 className="w-5 h-5 animate-spin text-black" />
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
                        className="flex-1 bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                        className="flex-1 bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputMessage.trim()}
                        className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;
