import { 
    Connection, 
    clusterApiUrl, 
    TransactionResponse, 
    TokenBalance, 
    ConfirmedTransactionMeta, 
    TokenAmount
} from "@solana/web3.js";

interface AccountSplTokenData { 
    preTokenBalanceAmount: number;
    postTokenBalanceAmount: number;
    decimal: number;
}

export const TransactionService = {
    async getTransaction(transactionHash: string): Promise<TransactionResponse> {
        const connection = new Connection(clusterApiUrl("mainnet-beta"));

        const transaction: TransactionResponse | null = await connection.getTransaction(transactionHash);

        if (transaction == null) {
            throw new Error(`Transaction not found for transaction id: ${transactionHash}`)
        } else {
            return transaction;
        }
    },

    async getAccountSplTokenData(transactionMeta: ConfirmedTransactionMeta, publicKey: string, splToken: string): Promise<AccountSplTokenData> {
        const preTokenBalances: TokenBalance[] | null | undefined = transactionMeta.preTokenBalances
        const postTokenBalances: TokenBalance[] | null | undefined = transactionMeta.postTokenBalances

        if (preTokenBalances == null || postTokenBalances == null) {
            throw new Error(`no token balances found`);
        }

        let walletPreTokenBalance: TokenAmount | null = await this.getTokenBalanceByOwnerAndMint(publicKey, splToken, preTokenBalances);
        let walletPostTokenBalance: TokenAmount | null = await this.getTokenBalanceByOwnerAndMint(publicKey, splToken, postTokenBalances);


        if (walletPreTokenBalance == null || walletPostTokenBalance == null) {
            throw new Error(`no token balance found`);
        }

        // using amount but not uiAmount for higher precision?
        // TODO: check if multiplying for big decimals affect precision in ts
        let preTokenBalanceUiAmount: number | null = +walletPreTokenBalance.amount
        let postTokenBalanceUiAmount: number | null = +walletPostTokenBalance.amount
        let postTokenBalanceDecimal: number | null = walletPostTokenBalance.decimals

        if (preTokenBalanceUiAmount == null || postTokenBalanceUiAmount == null || postTokenBalanceDecimal == null) {
            throw new Error(`no ui amount found`)
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

    async getTokenBalanceByOwnerAndMint(owner: string, mint: string, tokenBalances: TokenBalance[]): Promise<TokenAmount | null>{
        for (const tokenBalance of tokenBalances) {
            if (tokenBalance.mint == mint && tokenBalance.owner == owner) {
                return tokenBalance.uiTokenAmount;
            }
        }
        return null;
    },

    async verifySplTransfer(transactionHash: string, publicKey: string, splToken: string, amountTransferred: number): Promise<boolean> {
        try {
            const transactionResponse: TransactionResponse = await this.getTransaction(transactionHash);
            
            if (transactionResponse == null || transactionResponse.meta == null) {
                throw new Error(`no transaction found for transaction hash ${transactionHash}`);
            }
    
            const accountSplTokenData = await this.getAccountSplTokenData(transactionResponse.meta, publicKey, splToken);
    
            return amountTransferred * Math.pow(10, accountSplTokenData.decimal) == accountSplTokenData.postTokenBalanceAmount - accountSplTokenData.preTokenBalanceAmount;
        } catch (e) {
            throw e
        }
    }
}