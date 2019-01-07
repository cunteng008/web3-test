+ 下载依赖包
```sh
npm install web3 fs ethereumjs-wallet ethereumjs-tx --save-dev
```

+ 添加appId
  因为项目在交易添加了appId故要在交易参数结构添加appId，且要保证其位置与节点rpc服务的transaction数据结构顺序一致，否则rlp反序列化时会失败。
  在ethereumjs-tx的AppId