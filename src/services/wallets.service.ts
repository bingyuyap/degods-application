import { TheBlockchainAPI } from '../utils/theblockchainapi.util'
import { MetaplexApi } from '../utils/metaplex.util'

const blockchainApi: TheBlockchainAPI = new TheBlockchainAPI()
const metaplexApi: MetaplexApi = new MetaplexApi()

// token standard https://docs.metaplex.com/programs/token-metadata/token-standard
export interface NftMetadataAccount {
    key: string,
    updateAuthority: string,
    mint: string,
    name: string,
    symbol: string,
    uri: string,
    sellerFeeBasisPoints: number,
    creators: NftMetadataAccountCreators[],
    primarySaleHappened: boolean,
    isMutable: boolean,
    editionNonce: string,
    tokenStandard: string,
    collection: string,
    uses: string,
    offChainData: any
}

interface NftMetadataAccountCreators {
    address: string,
    verified: boolean,
    share: number,
}

export const WalletService = {
    async getWalletNFTs(publicKey: string) {
        let result: any 
        try {
            result = await blockchainApi.getWalletNFTs(publicKey);
        } catch (e: any) {
            return e.message
        }

        return result.nfts_metadata;
    },

    async getWalletNFTsMetaplex(publicKey: string) {
        let result: any 
        try {
            result = await metaplexApi.getWalletNFTsMetaplex(publicKey)
        } catch (e: any) {
            return e.message
        }
        let nftMetadataArray: NftMetadataAccount[] = new Array();

        for (var nft of result) {
            // convert fetched json object to a flattened json object
            nftMetadataArray.push(await getNftMetadata(nft))
            console.log("NFT: " + nft.metadataAccount.publicKey)
        }

        return nftMetadataArray
    },
}

let getNftMetadata = async function (walletNFT: any) {
    let metadataAccount: any = walletNFT.metadataAccount;

    let nftMetadata: NftMetadataAccount = {
        // TODO: not very sure what this key 
        key: metadataAccount.data.key,
        updateAuthority: walletNFT.updateAuthority,
        mint: walletNFT.mint,
        name: walletNFT.name,
        symbol: walletNFT.symbol,
        uri: walletNFT.uri,
        sellerFeeBasisPoints: walletNFT.sellerFeeBasisPoints,
        creators: walletNFT.creators,
        primarySaleHappened: walletNFT.primarySaleHappened,
        isMutable: walletNFT.isMutable,
        editionNonce: walletNFT.editionNonce,
        tokenStandard: walletNFT.tokenStandard,
        // TODO: find a way to get collection and uses like theblockchainapi
        collection: walletNFT.collection,
        uses: walletNFT.uses,
        offChainData: await metaplexApi.getOffChainData(walletNFT.uri),
    };

    return nftMetadata;
}

