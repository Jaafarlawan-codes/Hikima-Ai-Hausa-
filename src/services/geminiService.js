import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
    constructor() {
        // Get API key from environment variables
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            console.error('Gemini API key not found in environment variables');
            this.genAI = null;
            return;
        }
        
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        
        // System prompt for the AI tutor
        this.systemPrompt = `You are an expert AI tutor specializing in technology and artificial intelligence education. Your role is to:

1. Provide clear, accurate, and educational responses about technology, programming, AI, and related topics
2. Adapt your explanations to the user's level of understanding
3. Use examples and analogies to make complex concepts accessible
4. Encourage learning through questions and interactive discussions
5. Stay focused on educational content related to technology and AI
6. Be supportive and patient with learners at all levels

Please provide helpful, educational responses that promote learning and understanding.`;
    }

    async generateResponse(message, conversationHistory = []) {
        if (!this.genAI) {
            throw new Error('Gemini service not initialized. Please check your API key.');
        }

        try {
            // Build conversation context
            let prompt = this.systemPrompt + "\n\nConversation:\n";
            
            // Add conversation history (last 10 messages to stay within token limits)
            const recentHistory = conversationHistory.slice(-10);
            recentHistory.forEach(msg => {
                prompt += `${msg.sender === 'user' ? 'Student' : 'Tutor'}: ${msg.text}\n`;
            });
            
            prompt += `Student: ${message}\nTutor:`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Error generating response:', error);
            throw new Error('Failed to generate response. Please try again.');
        }
    }

    async generateTopicSuggestions(conversationHistory) {
        if (!this.genAI) {
            throw new Error('Gemini service not initialized. Please check your API key.');
        }

        try {
            const recentMessages = conversationHistory.slice(-5);
            const context = recentMessages.map(msg => msg.text).join(' ');
            
            const prompt = `Based on this conversation about technology and AI: "${context}"
            
            Suggest 3 related learning topics that would be interesting and educational for the student to explore next. Format your response as a simple list with each topic on a new line, starting with "* ".`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Error generating suggestions:', error);
            throw new Error('Failed to generate topic suggestions.');
        }
    }

    async summarizeConversation(conversationHistory) {
        if (!this.genAI) {
            throw new Error('Gemini service not initialized. Please check your API key.');
        }

        try {
            const messages = conversationHistory.map(msg => 
                `${msg.sender === 'user' ? 'Student' : 'Tutor'}: ${msg.text}`
            ).join('\n');

            const prompt = `Please provide a concise summary of this educational conversation about technology and AI:

${messages}

Format the summary with:
**Summary:**
[Brief overview of topics discussed and key learning points]

**Key Topics Covered:**
* [Topic 1]
* [Topic 2]
* [Topic 3]

Keep it educational and highlight the main learning outcomes.`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Error generating summary:', error);
            throw new Error('Failed to generate conversation summary.');
        }
    }
}

export default new GeminiService();