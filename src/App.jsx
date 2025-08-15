import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatPage from './pages/ChatPage';
import MessageBox from './components/MessageBox';

export default function App() {
    const [currentPage, setCurrentPage] = useState('login');
    const [language, setLanguage] = useState('en');
    const [userName, setUserName] = useState('');

    const handleLogin = (email, password) => {
        setUserName('Guest');
        setCurrentPage('chatbot');
    };

    const handleSignup = (name, email, password) => {
        setUserName(name);
        setCurrentPage('chatbot');
    };

    return (
        <div className="App">
            <MessageBox />
            {currentPage === 'login' && (
                <LoginPage
                    onLogin={handleLogin}
                    onSwitchToSignup={() => setCurrentPage('signup')}
                    language={language}
                    setLanguage={setLanguage}
                />
            )}
            {currentPage === 'signup' && (
                <SignupPage
                    onSignup={handleSignup}
                    onSwitchToLogin={() => setCurrentPage('login')}
                    language={language}
                    setLanguage={setLanguage}
                />
            )}
            {currentPage === 'chatbot' && (
                <ChatPage
                    language={language}
                    setLanguage={setLanguage}
                    userName={userName}
                />
            )}
        </div>
    );
}