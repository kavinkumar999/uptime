import axios from 'axios';
import { apiEndpoint } from './config';
import { getTimestamp, sendTelegramAlert } from './message';

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
async function checkApiStatus(url: string): Promise<boolean> {
  try {
    const response = await axios.get(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

performCheckWithAlert(5000);
