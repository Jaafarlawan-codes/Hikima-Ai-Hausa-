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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-200/50">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-xl">
                            <User className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                            {translations[language].welcomeBack}
                        </h1>
                        <p className="text-gray-600 text-lg">
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
                                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm text-lg"
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
                                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm text-lg"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-xl text-lg"
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
                                className="text-blue-600 hover:text-purple-600 font-semibold transition-colors"
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
