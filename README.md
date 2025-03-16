# Uptime

**Uptime** is a Node.js application that monitors an API endpoint and sends a notification to a Telegram bot when the API responds with a 200 OK status. This tool is ideal for tracking movie ticket availability or similar use cases where timely updates are crucial.

## Features

- Continuously monitors a specified API endpoint every 5 seconds.
- Sends a Telegram notification when the API status is 200 OK.
- Simple configuration for API endpoint and Telegram bot settings.

## Prerequisites

- Node.js (version 14.x or later recommended)
- `dotenv` library for environment variables
- `node-fetch` library for HTTP requests

#### Create a .env file in the root of the project directory and add the following environment variables:

```env
API_ENDPOINT=https://localhost:3001/
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
CHAT_ID=your_telegram_chat_id
```

> Replace `API_ENDPOINT` with the URL of the API endpoint you want to monitor. Update `TELEGRAM_BOT_TOKEN` and `CHAT_ID` with your Telegram bot token and chat ID, respectively.