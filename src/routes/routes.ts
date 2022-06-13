import express from 'express';
import { WalletController } from '../controllers/wallets.controller';
import { MessageController } from '../controllers/messages.controller';

const router = express.Router();

router.get('/wallet/:id/nfts', WalletController.getWalletNFTs);
router.get('/wallet-metaplex/:id/nfts', WalletController.getWalletNFTsMetaplex);

router.post('/message/verify', MessageController.verifyMessageSignature);
router.get('/message/sign', MessageController.simulateMessageSignature);

export = router;