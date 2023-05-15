
const baseDir = ".";

const CoinbaseHelper = require(baseDir+"/utils/CoinbaseHelper");
const BuyStrategy = require(baseDir+"/utils/BuyStrategy");

CoinbaseHelper.init().getAccountBalance((balance) => {
    if(balance) {
        CoinbaseHelper.init().buy(BuyStrategy.init().getDailyAmount(balance))
    }
});