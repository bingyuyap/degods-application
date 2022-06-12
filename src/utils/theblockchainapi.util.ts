import fetch from 'node-fetch';

export class TheBlockchainAPI {
    baseUrl: string
    network: string

    constructor() {
        this.baseUrl = 'https://api.blockchainapi.com/v1'
        this.network = 'mainnet-beta'
    }

    getApiSecretKey() {
        if (process.env.BLOCKCHAIN_API_SECRET_KEY === undefined) {
            throw new Error('BLOCKCHAIN_API_SECRET_KEY is undefined')
        }
        return process.env.BLOCKCHAIN_API_SECRET_KEY
    }

    getApiKeyId() {
        if (process.env.BLOCKCHAIN_API_KEY_ID === undefined) {
            throw new Error('BLOCKCHAIN_API_KEY_ID is undefined')
        }
        return process.env.BLOCKCHAIN_API_KEY_ID
    }


    async getWalletNFTs(publicKey: string) {
        // https://docs.blockchainapi.com/1734e24e-1c01-46c0-a45a-b4494bb4dc96#tag/Solana-Wallet/operation/solanaGetNFTsBelongingToWallet
        let route: string = `/solana/wallet/${this.network}/${publicKey}/nfts`

        try {
            const res = await fetch(`${this.baseUrl}${route}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'APIKeyId': this.getApiKeyId(),
                    'APISecretKey': this.getApiSecretKey()
                }
            });
            return res.json()
        } catch (e: any) {
            return e.message;
        }
    }
}