import base58 from 'bs58'
import nacl from 'tweetnacl'

export const MessageService = {
    async verify(message: string, signature: string, pk: string): Promise<boolean> {
        const publicKey: Uint8Array = base58.decode(pk);
        const messageBytes: Uint8Array = new TextEncoder().encode(message);
        const signatureBytes: Uint8Array = base58.decode(signature);
        return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKey);
    }
}
