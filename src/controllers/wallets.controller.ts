import { Request, Response, NextFunction } from 'express';
// import { TheBlockchainAPI } from '../utils/theblockchainapi.util'
import { MetaplexApi } from '../utils/metaplex.util'
import { WalletService } from '../services/wallets.service'

// const blockchainApi: TheBlockchainAPI = new TheBlockchainAPI()
const metaplexApi: MetaplexApi = new MetaplexApi()


export const WalletController = {
    async getWalletNFTs(req: Request, res: Response, next: NextFunction) {
        let wallet: string = req.params.id

        let result: any = await WalletService.getWalletNFTs(wallet)
        return res.status(200).json({
            message: result
        });
    },

    async getWalletNFTsMetaplex(req: Request, res: Response, next: NextFunction) {
        let wallet: string = req.params.id

        let result: any = await WalletService.getWalletNFTsMetaplex(wallet)
        return res.status(200).json({
            message: result
        });
    },
}