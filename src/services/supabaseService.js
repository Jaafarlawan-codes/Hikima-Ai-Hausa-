import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is configured
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase configuration not found. Please set up Supabase environment variables.');
    console.warn('Required variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

// Create Supabase client (will be null if not configured)
const supabase = supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

class SupabaseService {
    constructor() {
        this.client = supabase;
        this.isConfigured = !!supabase;
    }

    // Check if Supabase is properly configured
    checkConfiguration() {
        return {
            isConfigured: this.isConfigured,
            hasUrl: !!supabaseUrl,
            hasAnonKey: !!supabaseAnonKey,
            message: this.isConfigured 
                ? 'Supabase is properly configured' 
                : 'Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file'
        };
    }

    // Authentication methods
    async signUp(email, password, userData = {}) {
        if (!this.isConfigured) {
            throw new Error('Supabase is not configured');
        }

        const { data, error } = await this.client.auth.signUp({
            email,
            password,
            options: {
                data: userData
            }
        });

        if (error) throw error;
        return data;
    }

    async signIn(email, password) {
        if (!this.isConfigured) {
            throw new Error('Supabase is not configured');
        }

        const { data, error } = await this.client.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;
        return data;
    }

    async signOut() {
        if (!this.isConfigured) {
            throw new Error('Supabase is not configured');
        }

        const { error } = await this.client.auth.signOut();
        if (error) throw error;
    }

    async getCurrentUser() {
        if (!this.isConfigured) {
            return null;
        }

        const { data: { user } } = await this.client.auth.getUser();
        return user;
    }

    // Chat history methods (example)
    async saveChatMessage(userId, message, sender) {
        if (!this.isConfigured) {
            console.warn('Cannot save chat message: Supabase not configured');
            return null;
        }

        const { data, error } = await this.client
            .from('chat_messages')
            .insert([
                {
                    user_id: userId,
                    message: message,
                    sender: sender,
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) {
            console.error('Error saving chat message:', error);
            return null;
        }
        return data;
    }

    async getChatHistory(userId, limit = 50) {
        if (!this.isConfigured) {
            console.warn('Cannot get chat history: Supabase not configured');
            return [];
        }

        const { data, error } = await this.client
            .from('chat_messages')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('Error fetching chat history:', error);
            return [];
        }
        return data;
    }
}

export default new SupabaseService();