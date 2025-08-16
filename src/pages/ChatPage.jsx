import React, { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import { translations } from '../constants/translations';
import geminiService from '../services/geminiService';

const ChatPage = ({ language, setLanguage, userName, showMessageBox }) => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [isSummarizing, setIsSummarizing] = useState(false);

    const handleSendMessage = async (message) => {
        if (message.trim() === '') return;
        
        const userMessage = { sender: 'user', text: message };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setIsLoading(true);

        try {
            const response = await geminiService.generateResponse(message, messages);
            const botResponse = {
                sender: 'bot',
                text: response
            };
            setMessages(prevMessages => [...prevMessages, botResponse]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorResponse = {
                sender: 'bot',
                text: translations[language].apiError
            };
            setMessages(prevMessages => [...prevMessages, errorResponse]);
            showMessageBox(translations[language].apiError, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestTopics = async () => {
        const lastUserMessage = messages.filter(msg => msg.sender === 'user').pop();
        if (!lastUserMessage) {
            showMessageBox(translations[language].noPreviousMessage, 'error');
            return;
        }

        setIsSuggesting(true);
        try {
            const suggestionText = await geminiService.generateTopicSuggestions(messages);
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: suggestionText }]);
        } catch (error) {
            console.error('Error generating suggestions:', error);
            showMessageBox(translations[language].apiError, 'error');
        } finally {
            setIsSuggesting(false);
        }
    };

    const handleSummarizeChat = async () => {
        if (messages.length === 0) {
            showMessageBox(translations[language].noChatToSummarize, 'error');
            return;
        }

        setIsSummarizing(true);
        try {
            const summary = await geminiService.summarizeConversation(messages);
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: summary }]);
        } catch (error) {
            console.error('Error generating summary:', error);
            showMessageBox(translations[language].apiError, 'error');
        } finally {
            setIsSummarizing(false);
        }
    };

    const handleReadAloud = async (text) => {
        try {
            // Check if browser supports speech synthesis
            if ('speechSynthesis' in window) {
                // Cancel any ongoing speech
                window.speechSynthesis.cancel();
                
                // Create speech utterance
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 0.8;
                utterance.pitch = 1;
                utterance.volume = 1;
                
                // Set language based on current language setting
                utterance.lang = language === 'ha' ? 'ha-NG' : 'en-US';
                
                // Speak the text
                window.speechSynthesis.speak(utterance);
                showMessageBox(translations[language].readingAloud, 'success');
            } else {
                showMessageBox('Text-to-speech not supported in this browser', 'error');
            }
        } catch (error) {
            console.error('Error with text-to-speech:', error);
            showMessageBox('Error reading text aloud', 'error');
        }
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
