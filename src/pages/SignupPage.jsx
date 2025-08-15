import React from 'react';
import SignupForm from '../components/SignupForm';
import { translations } from '../constants/translations';

const SignupPage = ({ onSignup, onSwitchToLogin, language, setLanguage }) => {
    const handleSignup = (name, email, password) => {
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            alert(translations[language].fillAllFields);
            return;
        }
        onSignup(name, email, password);
    };

    return (
        <SignupForm
            onSignup={handleSignup}
            onSwitchToLogin={onSwitchToLogin}
            language={language}
            setLanguage={setLanguage}
        />
    );
};

export default SignupPage;
