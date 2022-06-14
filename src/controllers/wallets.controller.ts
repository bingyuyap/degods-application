import { Request, Response, NextFunction } from 'express'

import { WalletService, NftMetadataAccount } from '../services/wallets.service'

export const WalletController = {
    async getWalletNFTsMetaplex(req: Request, res: Response, next: NextFunction) {
        let wallet: string = req.body.wallet

        let result: NftMetadataAccount[] = await WalletService.getWalletNFTsMetaplex(wallet)
        return res.status(200).json({
            message: result
        })
    },
}