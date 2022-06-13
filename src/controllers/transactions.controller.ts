import { Request, Response, NextFunction } from 'express';

export const TransactionController = {
    // POST endpoint verifying a SPL transfer with (transactions hash, amount transferred, receiving wallet) as parameters
    async verifySplTransfer(req: Request, res: Response, next: NextFunction) {
        const transactionHash: string = req.body.transactionHash
        const amountTransferred: number = req.body.amountTransferred
        const receivingWallet: string = req.body.receivingWallet
    }
}
