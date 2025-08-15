import { useState } from 'react';

const useMessageBox = () => {
    const showMessageBox = (message, type) => {
        const messageBox = document.getElementById('message-box');
        if (messageBox) {
            messageBox.textContent = message;
            messageBox.className = `message-box fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
                type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            } transform translate-x-0 opacity-100`;
            setTimeout(() => {
                messageBox.className = 'message-box fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full opacity-0';
            }, 3000);
        }
    };

    return { showMessageBox };
};

export default useMessageBox;
