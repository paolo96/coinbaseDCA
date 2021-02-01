# Setup for cron

- Generate your coinbase pro API keys and write them in utils/Settings.js
- Set baseDir variable to absolute path in dca.js
- Set /path/to/dca.js to absolute path in dca-random.sh
- Give exec permission to dca-random.sh: `chmod +x dca-random.sh`
- Setup the following cronjob: `0 0 * * * /path/to/dca-random.sh &> /path/to/dca-log`
- (opt) Choose your buy strategy changing the function getDailyAmount in utils/BuyStrategy.js
