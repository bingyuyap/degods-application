# degods-interview

## getting started 

### `.env` file
1. go to [blockchainapi](https://docs.blockchainapi.com/#section/How-to-Use-the-API) to create an API key pair.
```
PORT=8000
BLOCKCHAIN_API_KEY_ID=<blockchain api key id>
BLOCKCHAIN_API_SECRET_KEY=<blockchain api secret key>
```

### APIs 
 ⁃ POST endpoint returning NFTs metadata in a wallet
 ⁃ POST endpoint verifying a signed message
 ⁃ POST endpoint verifying a SPL transfer with (transactions hash, amount transferred, receiving wallet) as parameters