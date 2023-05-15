

class Telegram {

    constructor() {

        this.bot_token = "your_bot_token";
        this.telegram_id = "your_telegram_id";
        this.bot_api = "https://api.telegram.org/bot";
        this.bot_method = "sendMessage";
        this.endPoint = this.bot_api + this.bot_token + "/" + this.bot_method;
        this.parse_mode = 'HTML';

    }

    generateParams(amount, baseSize, limitPrice) {

        let params = {};
        params.chat_id = this.telegram_id;
        params.parse_mode = this.parse_mode;

        let payload = "&#x1f3e6; <b>Daily savings</b>\n\n";
        payload += "Limit at: " + limitPrice.toFixed(2) + " &#x20AC;\n";
        payload += "Value BTC: " + baseSize + " &#x20bf;\n\n";
        payload += "Value EUR: " + amount + " &#x20bf;\n\n";

        params.text = payload;
        return JSON.stringify(params);

    }

    telegramPost(amount, baseSize, limitPrice) {

        const formBody = this.generateParams(amount, baseSize, limitPrice);
        fetch(this.endPoint, {
            method: 'POST',
            body: formBody,
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                if (resp.ok === true) {
                    console.log("Telegram message sent.");
                } else {
                    console.log("Telegram message FAILED!");
                }
            });

    }


    static init() {

        if (!!Telegram.instance) {
            return Telegram.instance;
        }
        Telegram.instance = new Telegram();
        return Telegram.instance;

    }

}

module.exports = Telegram
