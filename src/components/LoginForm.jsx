import React, { useState } from 'react';
import { Mail, Lock, LogIn, User, Globe } from 'lucide-react';
import { translations } from '../constants/translations';

const LoginForm = ({ onLogin, onSwitchToSignup, language, setLanguage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-black mb-2">
                            {translations[language].welcomeBack}
                        </h1>
                        <p className="text-gray-500">
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
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
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
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                        >
                            <LogIn className="w-5 h-5 mr-2" />
                            {translations[language].signIn}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-500">
                            {translations[language].noAccount}{' '}
                            <button
                                onClick={onSwitchToSignup}
                                className="text-black hover:text-gray-800 font-semibold transition-colors"
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

export default LoginForm;
