const Telegram = require("./Telegram.js");
const Settings = require("./Settings.js");

const axios = require('axios');
const CryptoJS = require('crypto-js');

class CoinbaseHelper {

    constructor() {

    }

    static init() {

        if (!!CoinbaseHelper.instance) { return CoinbaseHelper.instance; }
        CoinbaseHelper.instance = new CoinbaseHelper();
        return CoinbaseHelper.instance;

    }

    getRequestConfig(method, requestPath, body = null) {


        const timestamp = Math.floor(Date.now() / 1000).toString();
        const message = timestamp + method + requestPath + (body ? body : '');
        const signature = CryptoJS.HmacSHA256(message, Settings.init().coinbaseSecret).toString(CryptoJS.enc.Hex);

        let result = {
            method: method,
            url: 'https://api.coinbase.com' + requestPath,
            headers: {
                'CB-ACCESS-KEY': Settings.init().coinbaseKey,
                'CB-ACCESS-SIGN': signature,
                'CB-ACCESS-TIMESTAMP': timestamp,
                'Content-Type': 'application/json'
            },
        };
        if(body) {
            result.data = body;
        }
        return result;
    }

    getAccountBalance(callback) {

        let config = this.getRequestConfig("GET", "/api/v3/brokerage/accounts");

        axios(config)
            .then((data) => {
                if(data.data && data.data.accounts && data.data.accounts.length > 0) {
                    let accounts = data.data.accounts;
                    for(let i = 0; i < accounts.length; i++) {
                        if(accounts[i].currency === Settings.init().fiat) {
                            callback(accounts[i].available_balance.value);
                            break;
                        }
                    }
                } else {
                    callback(null);
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
                callback(null);
            });

    }

    buy(amount) {

        if(amount > 0) {

            CoinbaseHelper.init().getCryptoPrice((cryptoPrice) => {
                if(!cryptoPrice) {
                    return;
                }

                let limitPrice = (Number(cryptoPrice)-50);
                const baseSize = (amount/limitPrice).toFixed(8);
                limitPrice = limitPrice.toFixed(2);
                const params = JSON.stringify({
                    side: 'BUY',
                    product_id: Settings.init().crypto+'-'+Settings.init().fiat,
                    client_order_id: "dca"+Math.floor(Date.now() / 1000).toString(),
                    order_configuration: {
                        limit_limit_gtc: {
                            base_size: baseSize,
                            limit_price: limitPrice,
                            post_only: false
                        }
                    }
                });

                let config = this.getRequestConfig("POST", "/api/v3/brokerage/orders", params);

                axios(config)
                    .then((data) => {
                        if(data.data && data.data.success) {
                            if(Settings.init().isTelegramNotificationOn) {
                                Telegram.init().telegramPost(amount.toFixed(2), baseSize, limitPrice);
                            }
                        } else {
                            console.log("Error: ", data.data);
                        }
                    })
                    .catch((error) => {
                        console.log("Error: ", error);
                    });
            })

        } else {
            console.log("Not enough funds");
        }

    }

    getCryptoPrice(callback) {

        let config = this.getRequestConfig("GET", "/api/v3/brokerage/products/"+Settings.init().crypto+"-"+Settings.init().fiat);

        axios(config)
            .then((data) => {
                if(data.data && data.data.price) {
                    callback(data.data.price);
                } else {
                    callback(null);
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
                callback(null);
            });
    }

}

module.exports = CoinbaseHelper
