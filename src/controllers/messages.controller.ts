import { Request, Response, NextFunction } from 'express';
import base58 from 'bs58'
import nacl from 'tweetnacl'
import { Keypair } from '@solana/web3.js'

import { MessageService } from '../services/messages.service';

export const MessageController = {
    async simulateMessageSignature(req: Request, res: Response, next: NextFunction) {
        // use solana web3 js to create KeyPair object
        const keyPair: Keypair = new Keypair
        // get keyPair separately
        const pubKey: Uint8Array = keyPair.publicKey.toBytes()
        const privKey: Uint8Array = keyPair.secretKey

        // get message
        const messageString: string = req.body.message
        const message: Uint8Array = new TextEncoder().encode(messageString)

        // sign message
        const signature: Uint8Array = nacl.sign.detached(message, privKey)

        return res.status(200).json({
            message: {
                "publicKey": base58.encode(pubKey),
                "signature": base58.encode(signature),
            }
        })

    },

    async verifyMessageSignature(req: Request, res: Response, next: NextFunction) {
        let wallet: string = req.body.publicKey
        let signature: string = req.body.signature
        let message: string = req.body.message

        let result: boolean = await MessageService.verify(message, signature, wallet)
        return res.status(200).json({
            message: result
        });
    }
}

