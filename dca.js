
const baseDir = ".";

const CoinbaseHelper = require(baseDir+"/utils/CoinbaseHelper");
const BuyStrategy = require(baseDir+"/utils/BuyStrategy");

const coinbasePro = require(baseDir+'/node_modules/coinbase-pro');
const authedClient = CoinbaseHelper.init().getAuthedClient(coinbasePro);

CoinbaseHelper.init().getAccountBalance(authedClient, function (balance) {
    if(balance) {

        CoinbaseHelper.init().buy(authedClient, BuyStrategy.init().getDailyAmount(balance))

    }
});

