import { BigInt } from "@graphprotocol/graph-ts";

let AssetTypes = new Map<number, string>()
AssetTypes.set(0, 'Open')
AssetTypes.set(1, 'Accepted')
AssetTypes.set(2, 'Rejected')
AssetTypes.set(3, 'Canceled')

export const AssetTypeMap = AssetTypes;

export const ONE = BigInt.fromI32(1);