import { BigInt, TypedMap } from "@graphprotocol/graph-ts";


export const ONE = BigInt.fromI32(1);

export let TradeStatusMap = new TypedMap<number, string>()
TradeStatusMap.set(0, 'Open')
TradeStatusMap.set(1, 'Accepted')
TradeStatusMap.set(2, 'Rejected')
TradeStatusMap.set(3, 'Canceled')


export let AssetTypeMap = new TypedMap<number, string>()
AssetTypeMap.set(0, 'ERC20')
AssetTypeMap.set(1, 'ERC1155')
AssetTypeMap.set(2, 'ERC721')

