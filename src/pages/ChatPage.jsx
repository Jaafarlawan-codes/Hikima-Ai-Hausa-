import React, { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import { translations } from '../constants/translations';

const ChatPage = ({ language, setLanguage, userName }) => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [isSummarizing, setIsSummarizing] = useState(false);

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
            alert(translations[language].noPreviousMessage);
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
            alert(translations[language].noChatToSummarize);
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
        alert(translations[language].readingAloud);
        // In a real implementation, this would use text-to-speech API
        console.log('Reading aloud:', text);
    };

    return (
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
    );
};

export default ChatPage;
