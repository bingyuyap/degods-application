import express from 'express';
import { WalletController } from '../controllers/wallets.controller';

const router = express.Router();

router.get('/wallet/:id/nfts', WalletController.getWalletNFTs);
router.get('/wallet-metaplex/:id/nfts', WalletController.getWalletNFTsMetaplex);

export = router;