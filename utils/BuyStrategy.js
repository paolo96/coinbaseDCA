
class BuyStrategy {

    constructor() {

        this.K = 60;

    }

    static init() {

        if (!!BuyStrategy.instance) { return BuyStrategy.instance; }
        BuyStrategy.instance = new BuyStrategy();
        return BuyStrategy.instance;

    }

    getDailyAmount(balance) {

        var amount = balance/this.K;

        //Coinbase min order = 10 EUR
        if(amount <= 10) {
            amount = 10.01;
        }

        return amount;
    }

}

module.exports = BuyStrategy