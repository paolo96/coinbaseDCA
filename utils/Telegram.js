const fetch = require("node-fetch");

class Telegram {

    constructor() {

        this.bot_token = "your_bot_token";
        this.telegram_id = "your_telegram_id";
        this.bot_api = "https://api.telegram.org/bot";
        this.bot_method = "sendMessage";
        this.endPoint = this.bot_api+this.bot_token+"/"+this.bot_method;
        this.parse_mode = 'HTML';

    }
    
    generateParams(r = {}) {

			let params = {};
			params.chat_id = this.telegram_id;
			params.parse_mode = this.parse_mode;
			let text = {};
			text.date = new Date().toDateString();
			if(r.specified_funds) {
				text.qty = r.specified_funds;
			} else {
				text.qty = "unknown";
			}
			let payload = "&#x1f3e6; <b>Daily saving &#x20bf;</b>\n\n";
			payload += "Quantity: &#x20AC;"+text.qty+"\n";
			payload += "Date       : "+text.date+"\n";

			params.text = payload;
			return JSON.stringify(params);
	
	}

	telegramPost(r = {}) {
	                
	    const formBody = this.generateParams(r);
	    fetch(this.endPoint, {
				method: 'POST',
				body: formBody,
				headers: { "Content-type": "application/json;charset=UTF-8" }
	    })
			.then((resp) => {
				return resp.json();
	    })
			.then((resp) => {
				if(resp.ok === true) {
					console.log("Telegram message sent.");
				} else {
					console.log("Telegram message FAILED!");
				}
	    });

	}


    static init() {

			if (!!Telegram.instance) { return Telegram.instance; }
			Telegram.instance = new Telegram();
			return Telegram.instance;

    }

}

module.exports = Telegram
