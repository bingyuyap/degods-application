# degods-interview
aka my first time doing typescript and node.js 

<img src="assets/imgs/pepesad.jpeg" alt="drawing" style="width:100px;"/>

## getting started

### `.env` file

```
PORT=8000
```

### starting the programme on local machine

```sh
yarn
npm run dev
```

### APIs

1. POST endpoint returning NFTs metadata in a wallet
   
   **endpoint**: `/wallet/nfts`

   **method**: `POST`

   **body example**:

```json
{
  "wallet": "Heo1JGSdgVLRVxyteEjTk8T2ZNdJjwDikE3fbEytnRg9"
}
```

1. POST endpoint verifying a signed message

- POST endpoint simulating signing a message that returns publicKey and signature
  
  **endpoint**: `message/verify`

  **method**: `POST`

  **body**:

```json
{
   {
    "publicKey": "8wNrgAiDrbMHz6jTcMn9SCqYJGvPAR1e1sJD8kADPyPs",
    "signature": "4TYUZC3QDTb48GBnTuBW2j6Zcfr3NNWX6M4K8Xm7cienp2FaNrQxwYzKQcJVfoPQ6NtXjgTrB4aLLYRmtPd5CxSf",
    "message": "yeet"
}
}
```

- POST endpoint verifying a signed message
  
  **endpoint**: `message/verify`

  **method**: `POST`

  **body**:

```json
{
   {
    "publicKey": "8wNrgAiDrbMHz6jTcMn9SCqYJGvPAR1e1sJD8kADPyPs",
    "signature": "4TYUZC3QDTb48GBnTuBW2j6Zcfr3NNWX6M4K8Xm7cienp2FaNrQxwYzKQcJVfoPQ6NtXjgTrB4aLLYRmtPd5CxSf",
    "message": "yeet"
}
}
```

1. POST endpoint verifying a SPL transfer with (transactions hash, amount transferred, receiving wallet) as parameters
   
   **endpoint**: `spl-transfer/verify`

   **method**: `POST`

   **body**:

```json
{
  "transactionHash": "2TU5bt1H3xKnnnGQKMERKiWX4FmKsi5Cb4N3xRpTR6ohGxQPYXCFxvNcqp77tnood1kkePm54L165c5ZKd6gcSGW",
  "amountTransferred": 250,
  "receivingWallet": "4eVxYHcfst771LU5bdmS5xBrq67rx5F8PEBfs5zkx7dc"
}
```
