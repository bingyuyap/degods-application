import base58 from 'bs58'
import { Request, Response, NextFunction } from 'express'
import { Keypair } from '@solana/web3.js'
import nacl from 'tweetnacl'

import { MessageService } from '../services/messages.service'

export const MessageController = {
    async simulateMessageSignature(req: Request, res: Response, next: NextFunction) {
        if (process.env.PAYER_SECRET_KEY === undefined) {
            throw new Error(`Payer Secret Key not found please update dotenv file!`)
        }

        // generate payer and receiver keypair
        const payerSecretKey: Uint8Array = Uint8Array.from(base58.decode(process.env.PAYER_SECRET_KEY))
        const keyPair: Keypair = Keypair.fromSecretKey(payerSecretKey)
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
                "sigBuffer": signature.toString()
            }
        })

    },

    async verifyMessageSignature(req: Request, res: Response, next: NextFunction) {
        let wallet: string = req.body.publicKey
        let signature: string = req.body.signature
        let message: string = req.body.message

        try {
            let result: boolean = await MessageService.verify(message, signature, wallet)
            return res.status(200).json({
                message: result
            })
        } catch (e) {
            return res.status(200).json({
                message: (e as Error).message
            })
        }
        
    }
}

