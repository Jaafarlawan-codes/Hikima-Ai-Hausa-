# Tech & AI Learning App

A modern, bilingual (English/Hausa) educational chatbot application powered by Google's Gemini 2.0 Flash model. This app helps users learn about technology and artificial intelligence through interactive conversations.

## Features

- 🤖 **AI-Powered Learning**: Integrated with Google Gemini 2.0 Flash for intelligent responses
- 🌍 **Bilingual Support**: Full support for English and Hausa languages
- 💬 **Interactive Chat**: Real-time conversations with an AI tutor
- 🎯 **Topic Suggestions**: AI-generated learning topic recommendations
- 📝 **Chat Summarization**: Automatic conversation summaries
- 🔊 **Text-to-Speech**: Read responses aloud in both languages
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- A Google AI Studio API key for Gemini

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tech-ai-learning-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env` file

### Deployment

For deployment on Netlify:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your repository to Netlify
   - Set the build command to `npm run build`
   - Set the publish directory to `dist`
   - Add your `VITE_GEMINI_API_KEY` as an environment variable in Netlify's dashboard

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChatInterface.jsx
│   ├── LoginForm.jsx
│   ├── SignupForm.jsx
│   └── MessageBox.jsx
├── pages/              # Page components
│   ├── ChatPage.jsx
│   ├── LoginPage.jsx
│   └── SignupPage.jsx
├── services/           # External service integrations
│   └── geminiService.js
├── constants/          # App constants and translations
│   └── translations.js
├── hooks/              # Custom React hooks
│   └── useMessageBox.js
└── styles/             # Global styles
    └── index.css
```

## Technologies Used

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google Generative AI (Gemini 2.0 Flash)
- **Icons**: Lucide React
- **Text-to-Speech**: Web Speech API

## Features in Detail

### AI Chatbot
- Powered by Google's Gemini 2.0 Flash model
- Specialized in technology and AI education
- Context-aware conversations
- Educational focus with adaptive explanations

### Bilingual Support
- Complete English and Hausa translations
- Language toggle functionality
- Localized text-to-speech support

### Interactive Features
- **Topic Suggestions**: AI generates relevant learning topics based on conversation
- **Chat Summarization**: Automatic summaries of learning sessions
- **Text-to-Speech**: Browser-based speech synthesis in both languages
- **Responsive Design**: Optimized for all device sizes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on the repository or contact the development team.