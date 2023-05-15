
class Settings {

    constructor() {

        this.fiat = 'EUR';
        this.crypto = 'BTC';
        this.coinbaseKey = 'YOUR_KEY';
        this.coinbaseSecret = 'YOUR_SECRET';
        
        this.isTelegramNotificationOn = false;

    }

    static init() {

        if (!!Settings.instance) { return Settings.instance; }
        Settings.instance = new Settings();
        return Settings.instance;

    }


}

module.exports = Settings
