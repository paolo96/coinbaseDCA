const Telegram = require("./Telegram.js");
const Settings = require("./Settings.js");

class CoinbaseHelper {

    constructor() {

    }

    static init() {

        if (!!CoinbaseHelper.instance) { return CoinbaseHelper.instance; }
        CoinbaseHelper.instance = new CoinbaseHelper();
        return CoinbaseHelper.instance;

    }

    getAuthedClient(coinbasePro) {

        return new coinbasePro.AuthenticatedClient(
            Settings.init().coinbaseKey,
            Settings.init().coinbaseSecret,
            Settings.init().coinbasePassphrase,
            Settings.init().apiURI
        );

    }

    getAccountBalance(authedClient, callback) {

        authedClient.getAccounts().then(data => {

            if(data.length > 0) {
                for(var i = 0; i < data.length; i++) {
                    if(data[i].currency === Settings.init().fiat) {
                        callback(data[i].available);
                        break;
                    }
                }
            } else {
                callback(null);
            }
        })
        .catch(error => {
            console.log("Error: ", error);
            callback(null);
        });

    }

    buy(authedClient, amount) {

        if(amount > 0) {
            const buyParams = {
                funds: amount,
                side: 'buy',
                type: 'market',
                product_id: Settings.init().crypto+'-'+Settings.init().fiat,
            };
            authedClient.placeOrder(buyParams).then(r => {
                console.log(r);
                if(Settings.init().isTelegramNotificationOn) {
                    if(r.id) {
                        authedClient.getOrder(r.id, function (resultOrder) {
                            if(resultOrder.filled_size) {
                                Telegram.init().telegramPost(amount, resultOrder.filled_size);
                            } else {
                                Telegram.init().telegramPost(amount);
                            }
                        })
                    } else {
                        Telegram.init().telegramPost(amount);
                    }
                }
            });
        } else {
            console.log("Not enough funds");
        }

    }
}

module.exports = CoinbaseHelper
