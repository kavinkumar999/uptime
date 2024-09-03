
import dotenv from 'dotenv';

dotenv.config();

export const apiEndpoint: string = process.env.API_ENDPOINT || 'http://localhost:3001';
export const telegramBotToken: string = process.env.TELEGRAM_BOT_TOKEN || '';
export const chatId: string = process.env.CHAT_ID || '';