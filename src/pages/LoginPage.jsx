import React from 'react';
import LoginForm from '../components/LoginForm';
import { translations } from '../constants/translations';

const LoginPage = ({ onLogin, onSwitchToSignup, language, setLanguage }) => {
    const handleLogin = (email, password) => {
        if (email.trim() === '' || password.trim() === '') {
            alert(translations[language].enterEmailPassword);
            return;
        }
        onLogin(email, password);
    };

    return (
        <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={onSwitchToSignup}
            language={language}
            setLanguage={setLanguage}
        />
    );
};

export default LoginPage;
