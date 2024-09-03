import axios from 'axios';
import { telegramBotToken, chatId } from './config';

export async function sendTelegramAlert(message: string): Promise<void> {
  const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
  const body = {
    chat_id: chatId,
    text: message,
  };

  try {
    const response = await axios.post(url, body);

    if (response.status === 200) {
      console.log(`[${getTimestamp()}] Alert sent to Telegram.`);
    } else {
      console.error(`[${getTimestamp()}] Failed to send alert to Telegram.`);
    }
  } catch (error) {
    console.error(`[${getTimestamp()}] Error sending Telegram alert:`, error);
  }
}

export function getTimestamp(): string {
  return new Date().toISOString();
}
