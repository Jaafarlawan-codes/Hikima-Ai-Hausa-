import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatPage from './pages/ChatPage';
import MessageBox from './components/MessageBox';
import useMessageBox from './hooks/useMessageBox';
import { translations } from './constants/translations';

export default function App() {
    const [currentPage, setCurrentPage] = useState('login');
    const [language, setLanguage] = useState('en');
    const [userName, setUserName] = useState('');
    const { showMessageBox } = useMessageBox();

    const handleLogin = (email, password) => {
        setUserName('Guest');
        setCurrentPage('chatbot');
        showMessageBox(translations[language].loginSuccess, 'success');
    };

    const handleSignup = (name, email, password) => {
        setUserName(name);
        setCurrentPage('chatbot');
        showMessageBox(translations[language].signupSuccess, 'success');
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
                    showMessageBox={showMessageBox}
                />
            )}
            {currentPage === 'signup' && (
                <SignupPage
                    onSignup={handleSignup}
                    onSwitchToLogin={() => setCurrentPage('login')}
                    language={language}
                    setLanguage={setLanguage}
                    showMessageBox={showMessageBox}
                />
            )}
            {currentPage === 'chatbot' && (
                <ChatPage
                    language={language}
                    setLanguage={setLanguage}
                    userName={userName}
                    showMessageBox={showMessageBox}
                />
            )}
        </div>
    );
}