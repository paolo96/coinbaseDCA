
class BuyStrategy {

    constructor() {

        this.K = 60;
        this.coinbaseMinOrder = 10;

    }

    static init() {

        if (!!BuyStrategy.instance) { return BuyStrategy.instance; }
        BuyStrategy.instance = new BuyStrategy();
        return BuyStrategy.instance;

    }

    getDailyAmount(balance) {
        
        if(balance <= this.coinbaseMinOrder) {
            return 0;
        }
        
        var amount = balance/this.K;

        if(amount <= this.coinbaseMinOrder) {
            amount = this.coinbaseMinOrder+0.01;
        }
        
        amount = amount.toFixed(2);

        return amount;
    }

}

module.exports = BuyStrategy
