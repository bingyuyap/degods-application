import { 
    Connection, 
    clusterApiUrl, 
    TransactionResponse, 
    TokenBalance, 
    ConfirmedTransactionMeta, 
    TokenAmount
} from "@solana/web3.js"

interface AccountSplTokenData { 
    preTokenBalanceAmount: number
    postTokenBalanceAmount: number
    decimal: number
}

export const TransactionService = {
    async getTransaction(transactionHash: string): Promise<TransactionResponse> {
        const connection = new Connection(clusterApiUrl("mainnet-beta"))

        const transaction: TransactionResponse | null = await connection.getTransaction(transactionHash)

        if (transaction == null) {
            const errorMsg: string = `Transaction not found for transaction id: ${transactionHash}`
            console.error(`[getTransaction] ${errorMsg}`)
            throw new Error(errorMsg)
        } else {
            return transaction
        }
    },

    async getAccountSplTokenData(transactionMeta: ConfirmedTransactionMeta, publicKey: string): Promise<AccountSplTokenData> {
        const preTokenBalances: TokenBalance[] | null | undefined = transactionMeta.preTokenBalances
        const postTokenBalances: TokenBalance[] | null | undefined = transactionMeta.postTokenBalances

        if (preTokenBalances == null || postTokenBalances == null) {
            const errorMsg: string = `no token balance found`
            console.error(`[getAccountSplTokenData] ${errorMsg}`)
            throw new Error(`no token balances found`)
        }

        let walletPreTokenBalance: TokenAmount | null = await this.getTokenBalanceByOwner(publicKey, preTokenBalances)
        let walletPostTokenBalance: TokenAmount | null = await this.getTokenBalanceByOwner(publicKey, postTokenBalances)

        if (walletPreTokenBalance == null || walletPostTokenBalance == null) {
            const errorMsg: string = `no token balance found`
            console.error(`[getAccountSplTokenData] ${errorMsg}`)
            throw new Error(errorMsg)
        }

        // using amount but not uiAmount for higher precision?
        // TODO: check if multiplying for big decimals affect precision in ts
        let preTokenBalanceUiAmount: number | null = +walletPreTokenBalance.amount
        let postTokenBalanceUiAmount: number | null = +walletPostTokenBalance.amount
        let postTokenBalanceDecimal: number | null = walletPostTokenBalance.decimals

        if (preTokenBalanceUiAmount == null || postTokenBalanceUiAmount == null || postTokenBalanceDecimal == null) {
            const errorMsg: string = `no ui amount found`
            console.error(`[getAccountSplTokenData] ${errorMsg}`)
            throw new Error(errorMsg)
        }

        console.log("preTokenBalanceUiAmount: " + preTokenBalanceUiAmount)
        console.log("postTokenBalanceUiAmount: " + postTokenBalanceUiAmount)

        let accountSplTokenData: AccountSplTokenData = {
            "preTokenBalanceAmount": preTokenBalanceUiAmount,
            "postTokenBalanceAmount": postTokenBalanceUiAmount,
            "decimal": postTokenBalanceDecimal
        }

        return accountSplTokenData
    },

    async getTokenBalanceByOwner(owner: string, tokenBalances: TokenBalance[]): Promise<TokenAmount | null>{
        for (const tokenBalance of tokenBalances) {
            if (tokenBalance.owner == owner) {
                return tokenBalance.uiTokenAmount
            }
        }
        return null
    },

    async verifySplTransfer(transactionHash: string, publicKey: string, splToken: string, amountTransferred: number): Promise<boolean> {
        console.log(`[verifySplTransfer] transactionHash: ${transactionHash}, publicKey: ${publicKey}, amountTransferred: ${amountTransferred}`)
        
        try {
            const transactionResponse: TransactionResponse = await this.getTransaction(transactionHash)

            if (transactionResponse == null || transactionResponse.meta == null) {
                const errorMsg: string = `no transaction found for transaction hash ${transactionHash}`
                console.error(`[verifySplTransfer] ${errorMsg}`)
                throw new Error(errorMsg)
            }
    
            const accountSplTokenData: AccountSplTokenData = await this.getAccountSplTokenData(transactionResponse.meta, publicKey)
    
            return amountTransferred * Math.pow(10, accountSplTokenData.decimal) == accountSplTokenData.postTokenBalanceAmount - accountSplTokenData.preTokenBalanceAmount
        } catch (e) {
            throw e
        }
    }
}