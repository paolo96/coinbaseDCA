
class Settings {


    constructor() {

        this.fiat = 'EUR';
        this.crypto = 'BTC';
        this.coinbaseKey = 'YOUR_KEY';
        this.coinbaseSecret = 'YOUR_SECRET';
        this.coinbasePassphrase = 'YOUR_PASSPHRASE';

        this.apiURI = 'https://api.pro.coinbase.com';
        //SANDBOX -> this.apiURI = 'https://api-public.sandbox.pro.coinbase.com';

    }

    static init() {

        if (!!Settings.instance) { return Settings.instance; }
        Settings.instance = new Settings();
        return Settings.instance;

    }


}

module.exports = Settings