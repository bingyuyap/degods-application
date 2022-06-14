import axios, { AxiosResponse } from 'axios';
import { Metaplex, Nft } from "@metaplex-foundation/js-next";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
export class MetaplexApi {
    // https://github.com/metaplex-foundation/js-next#findAllByOwner
    async getWalletNFTsMetaplex(publicKey: string): Promise<Nft[]> {
        const connection = new Connection(clusterApiUrl("mainnet-beta"));
        const metaplex = new Metaplex(connection);
        try {
            return await metaplex.nfts().findAllByOwner(new PublicKey(publicKey));
        } catch (e) {
            throw e;
        }
    }

    async getOffChainData(uri: string) {
        let response: AxiosResponse;
        try {
            response = await axios.get(uri);
            return response.data;
        } catch (e) {
            // offChainData might not be available, dont throw error
            console.log(`[getOffChainData2] failed to fetch data from uri: ${uri}`)
            return {
                "error": `failed to fetch data from uri: ${uri}`
            };
        }
    }
}