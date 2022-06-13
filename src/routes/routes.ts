import express from 'express';
import { WalletController } from '../controllers/wallets.controller';
import { MessageController } from '../controllers/messages.controller';
import { TransactionController } from '../controllers/transactions.controller';

const router = express.Router();

router.get('/wallet-metaplex/:id/nfts', WalletController.getWalletNFTsMetaplex);

router.post('/message/verify', MessageController.verifyMessageSignature);
router.get('/message/sign', MessageController.simulateMessageSignature);

router.get('/transaction', TransactionController.getTransaction);
router.post('/spl-transfer/verify', TransactionController.verifySplTransfer);

export = router;