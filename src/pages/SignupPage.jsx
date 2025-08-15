import React from 'react';
import SignupForm from '../components/SignupForm';
import { translations } from '../constants/translations';

const SignupPage = ({ onSignup, onSwitchToLogin, language, setLanguage, showMessageBox }) => {
    const handleSignup = (name, email, password) => {
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            showMessageBox(translations[language].fillAllFields, 'error');
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
