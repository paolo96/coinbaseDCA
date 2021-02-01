
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

        const buyParams = {
            funds: amount,
            side: 'buy',
            type: 'market',
            product_id: Settings.init().crypto+'-'+Settings.init().fiat,
        };
        authedClient.placeOrder(buyParams).then(r => {
            console.log(r);
        });

    }
}

module.exports = CoinbaseHelper