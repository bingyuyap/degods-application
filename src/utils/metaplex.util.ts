import { Metaplex, Nft } from "@metaplex-foundation/js-next";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
export class MetaplexApi {
    // https://github.com/metaplex-foundation/js-next#findAllByOwner
    async getWalletNFTsMetaplex(publicKey: string): Promise<Nft[]> {
        const connection = new Connection(clusterApiUrl("mainnet-beta"));
        const metaplex = new Metaplex(connection);
        try {
            return await metaplex.nfts().findAllByOwner(new PublicKey(publicKey));
        } catch (e: any) {
            throw e;
        }
    }

    // TODO: change to axios 
    async getOffChainData(uri: string) {
        let res: any = null;
        try {
            res = await fetch(uri, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } catch (e: any) {
            return null;
        }
        
        let data: any = null
        try {
            data = await res.json();
        } catch (e: any) {
            if (e instanceof TypeError) {
                data = await res.text();
            }
            return e.message;
        }
        return data;
    }
}