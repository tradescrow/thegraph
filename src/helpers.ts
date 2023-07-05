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

export function createOrLoadTrade(id: BigInt): Trade {
  let config = createOrLoadConfig()
  let trade = Trade.load(Bytes.fromHexString(id.toHex()))
  if (!trade) {
    trade = new Trade(Bytes.fromHexString(id.toHex()))
    trade.status = 'Created'
    trade.fee = config.feeAmount
    trade.party = Address.zero()
    trade.counterparty = Address.zero()
    trade.offered = []
    trade.desired = []
    trade.save()
  }
  return trade
}

export function createOrLoadAsset(tradeId: BigInt, address: Address, user: User): Asset {
  let id = Bytes.fromHexString(address.toHex() + "-" + user.id.toHex() + "-" + tradeId.toHex())
  let asset = Asset.load(id)
  if (!asset) {
    asset = new Asset(id)
    asset.address = address
    asset.kind = 'ERC20'
    asset.user = user.id
    asset.save()
  }
  return asset
}
