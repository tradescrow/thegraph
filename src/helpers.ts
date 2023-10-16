import { Address, BigInt, Bytes, dataSource } from "@graphprotocol/graph-ts";
import { Asset, Config, Trade, User } from "../generated/schema";


export function createOrLoadConfig(): Config {

  let config = Config.load(dataSource.network())
  if (!config) {
    config = new Config(dataSource.network())
    config.feeAmount = BigInt.zero()
    config.feeToken = Address.zero()
    config.feesReleased = BigInt.zero()
    config.feesPaid = BigInt.zero()
    config.feesRefunded = BigInt.zero()
    config.feesInEscrow = BigInt.zero()
    config.paused = false
    config.treasury = Address.zero()
    config.accepted = BigInt.zero()
    config.rejected = BigInt.zero()
    config.canceled = BigInt.zero()
    config.created = BigInt.zero()
    config.save()
  }
  return config
}

export function createOrLoadUser(address: Address): User {
  let user = User.load(address)
  if (!user) {
    user = new User(address)
    user.feesReleased = BigInt.zero()
    user.feesPaid = BigInt.zero()
    user.feesRefunded = BigInt.zero()
    user.feesInEscrow = BigInt.zero()
    user.accepted = BigInt.zero()
    user.rejected = BigInt.zero()
    user.canceled = BigInt.zero()
    user.created = BigInt.zero()
    user.completed = BigInt.zero()
    user.received = BigInt.zero()
    user.save()
  }
  return user
}

export function createOrLoadTrade(tradeId: BigInt): Trade {
  let config = createOrLoadConfig()
  let id = Bytes.fromByteArray(Bytes.fromBigInt(tradeId))
  let trade = Trade.load(id)
  if (!trade) {
    trade = new Trade(id)
    trade.status = 'Open'
    trade.time = 0
    trade.chain = config.id
    trade.fee = config.feeAmount
    trade.party = Address.zero()
    trade.counterparty = Address.zero()
    trade.save()
  }
  return trade
}

export function createOrLoadAsset(tradeId: BigInt, address: Address, tokenId: BigInt, user: User): Asset {
  let id = Bytes.fromUTF8(address.toHex() + "-" + tokenId.toHex() + "-" + user.id.toHex() + "-" + tradeId.toHex())
  let asset = Asset.load(id)
  if (!asset) {
    asset = new Asset(id)
    asset.address = address
    asset.kind = 'ERC20'
    asset.user = user.id
    asset.tokenId = tokenId
    asset.save()
  }
  return asset
}
