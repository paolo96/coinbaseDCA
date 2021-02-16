# Setup for cron

- Generate your coinbase pro API keys and write them in utils/Settings.js
- Set baseDir variable to absolute path in dca.js
- Set /path/to/dca.js to absolute path in dca-random.sh
- Give exec permission to dca-random.sh: `chmod +x dca-random.sh`
- Setup the following cronjob: `0 0 * * * /path/to/dca-random.sh &> /path/to/dca-log`
- (opt) Choose your buy strategy changing the function getDailyAmount in utils/BuyStrategy.js


# Setup for Telegram notification

- [Create a new bot with Botfather](https://t.me/botfather):
  * In the chat with Botfather, type `/newbot`
  * Follow the instructions choosing name and username of your bot
  * At the end of the process, Botfather will send you your bot token
- To retrieve your telegram_id:
  * in Telegram, send a direct message to the bot
  * go to `https://api.telegram.org/bot(your_bot_token)/getUpdates`: you will find your telegram_id under `message->from->id
- You are now able to fill all the properties in utils/Telegram.js and send messages to yourself
- Set `isTelegramNotificationOn` = true in utils/Settings.js
