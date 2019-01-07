var Web3 = require("web3"); //引入web3支持，我本地使用的是web3^0.18.4
var Tx = require("ethereumjs-tx"); //引入以太坊js交易支持


//初始化web3
if (typeof web3 !== 'undefined') {
web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.8.100:8545/"));
}
var privateKey = Buffer.from('D8FEA46EA31D862C8446077C4D43DD89A9CE8A6856BF091ED69655764E58CA5E', 'hex');
//打印当前钱包privateKey
console.info("private key : " + privateKey.toString("hex"));

(async() => {
    var fromAddress = "0xa45100DA4D510b30Bc6F3d663B4b7fc6bCA0Ac18";
    var toAddress = "0xd92686e73bAc61E38f2C2aA99bE76CE22BBee029";
    console.info("from Address: " + fromAddress);
    var fromAddressBalance = web3.utils.fromWei(await web3.eth.getBalance(fromAddress),'ether');
    console.info("from Address Balance: " + fromAddressBalance);

    //返回指定地址发起的交易数
    var number = await web3.eth.getTransactionCount(fromAddress);
    console.info("address:"+fromAddressBalance+ ";has " +number + " transactions in total")
    //通过交易参数
    var ether = 1000000000000000000
    var rawTx = {
        nonce: number,//交易数
        gasPrice: 30,//gas价格
        gasLimit:  210000,//gas配额
        to: toAddress,//转账到哪个账户
        value: ether,//以太币数量
        data: ''
    };

    //构造此交易对象
    var tx = new Tx(rawTx);
    //发起人私钥签名
    tx.sign(privateKey);
    //交易序列化
    var serializedTx = tx.serialize();
    //执行交易
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
        console.log('transaction id ：'+hash);
        console.log(err);
    });
})();