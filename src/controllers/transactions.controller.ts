import { Request, Response, NextFunction } from 'express'
import { TransactionResponse } from "@solana/web3.js"

import { TransactionService } from '../services/transactions.service'

export const TransactionController = {
    // POST endpoint verifying a SPL transfer with (transactions hash, amount transferred, receiving wallet) as parameters
    async verifySplTransfer(req: Request, res: Response, next: NextFunction) {
        const transactionHash: string = req.body.transactionHash
        const amountTransferred: number = req.body.amountTransferred
        const receivingWallet: string = req.body.receivingWallet
        const splToken: string = req.body.splToken

        try { 
            const verified: boolean = await TransactionService.verifySplTransfer(transactionHash, receivingWallet, splToken,  amountTransferred)
            return res.status(200).json({
                message: verified
            })
        } catch (e) {
            return res.status(200).json({
                message: (e as Error).message
            })
        }
    },

    async getTransaction(req: Request, res: Response, next: NextFunction) {
        const transactionHash: string = req.body.transactionHash

        try { 
            const transaction: TransactionResponse = await TransactionService.getTransaction(transactionHash)
            return res.status(200).json({
                message: transaction
            })
        } catch (e) {
            return res.status(200).json({
                message: (e as Error).message
            })
        }
    },
}
