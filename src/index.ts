import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export const apiEndpoint: string = process.env.API_ENDPOINT || 'http://localhost:3001';
export const telegramBotToken: string = process.env.TELEGRAM_BOT_TOKEN || '';
export const chatId: string = process.env.CHAT_ID || '';


export async function sendTelegramAlert(message: string): Promise<void> {
  const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
  const body = JSON.stringify({
    chat_id: chatId,
    text: message,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (response.ok) {
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




async function performCheckWithAlert(interval: number): Promise<void> {
  while (true) {
    const isAvailable = await checkApiStatus(apiEndpoint);

    if (isAvailable) {
      const timestamp = getTimestamp();
      console.log(`[${timestamp}] API is now available 🚀 ${timestamp}`);
      const message = `API is now available 🚀 ${timestamp}.`;
      await sendTelegramAlert(message);
      break;
    } else {
      console.log(`[${getTimestamp()}] API is not available.`);
    }

    await new Promise<void>(resolve => setTimeout(resolve, interval));
  }
}

export async function checkApiStatus(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    return response.status === 200;
  } catch (error) {
    console.error(`[${getTimestamp()}] Error:`, error);
    return false;
  }
}

performCheckWithAlert(5000);


