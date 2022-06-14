import base58 from 'bs58'
import nacl from 'tweetnacl'

export const MessageService = {
    async verify(message: string, signature: string, publicKey: string): Promise<boolean> {
        const publicKeyBytes: Uint8Array = base58.decode(publicKey)
        const messageBytes: Uint8Array = new TextEncoder().encode(message)
        const signatureBytes: Uint8Array = base58.decode(signature)

        try {
            return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes)
        } catch (e) {
            console.error(`Verification error for message: ${message}, signature: ${signature}, publicKey: ${publicKey}`)
            throw e
        }
    }
}
