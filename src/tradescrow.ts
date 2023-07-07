// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import { Address, BigInt, log } from "@graphprotocol/graph-ts";
import {
  // Tradescrow,
  AdminChanged,
  BeaconUpgraded,
  FeePaid,
  FeeRefunded,
  FeeReleased,
  FeeUpdated,
  Initialized,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TradeAccepted,
  TradeCanceled,
  TradeCreated,
  TradeRejected,
  TreasuryUpdated,
  Unpaused,
  Upgraded
} from "../generated/Tradescrow/Tradescrow"
import { createOrLoadAsset, createOrLoadConfig, createOrLoadTrade, createOrLoadUser } from "./helpers";
import { ONE } from "./constants";

export function handleAdminChanged(event: AdminChanged): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  //let entity = ExampleEntity.load(event.transaction.from)
//
  //// Entities only exist after they have been saved to the store;
  //// `null` checks allow to create entities on demand
  //if (!entity) {
  //  entity = new ExampleEntity(event.transaction.from)
//
  //  // Entity fields can be set using simple assignments
  //  entity.count = BigInt.fromI32(0)
  //}
//
  //// BigInt and BigDecimal math are supported
  //entity.count = entity.count + BigInt.fromI32(1)
//
  //// Entity fields can be set based on event parameters
  //entity.previousAdmin = event.params.previousAdmin
  //entity.newAdmin = event.params.newAdmin
//
  //// Entities can be written to the store with `.save()`
  //entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.ADMIN_ROLE(...)
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.feeToken(...)
  // - contract.feeTreasury(...)
  // - contract.getRoleAdmin(...)
  // - contract.getRoleMember(...)
  // - contract.getRoleMemberCount(...)
  // - contract.getTrade(...)
  // - contract.hasRole(...)
  // - contract.isValidTradeId(...)
  // - contract.paused(...)
  // - contract.proxiableUUID(...)
  // - contract.supportsInterface(...)
  // - contract.userFee(...)
}

export function handleBeaconUpgraded(event: BeaconUpgraded): void {}

export function handleFeePaid(event: FeePaid): void {
  let config = createOrLoadConfig()
  config.feesInEscrow = config.feesInEscrow.plus(event.params.amount)
  config.feesPaid = config.feesPaid.plus(event.params.amount)
  config.save()
}

export function handleFeeRefunded(event: FeeRefunded): void {
  let config = createOrLoadConfig()
  config.feesInEscrow = config.feesInEscrow.minus(event.params.amount)
  config.feesRefunded = config.feesRefunded.plus(event.params.amount)
  config.save()
}

export function handleFeeReleased(event: FeeReleased): void {
  let config = createOrLoadConfig()
  config.feesInEscrow = config.feesInEscrow.minus(event.params.amount)
  config.feesReleased = config.feesReleased.plus(event.params.amount)
  config.save()
}

export function handleFeeUpdated(event: FeeUpdated): void {
  let config = createOrLoadConfig()
  config.feeToken = event.params.token
  config.feeAmount = event.params.fee
  config.save()
}

export function handleInitialized(event: Initialized): void {
  createOrLoadConfig()
}

export function handlePaused(event: Paused): void {
  let config = createOrLoadConfig()
  config.paused = true
  config.save()
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleTradeAccepted(event: TradeAccepted): void {
  let config = createOrLoadConfig()
  config.accepted = config.accepted.plus(ONE)
  config.save()

  let trade = createOrLoadTrade(event.params.tradeId)
  trade.status = 'Accepted'
  trade.save()

  let party = createOrLoadUser(Address.fromBytes(trade.party))
  party.completed = party.completed.plus(ONE)
  party.feesInEscrow = party.feesInEscrow.minus(trade.fee)
  party.feesReleased = party.feesReleased.plus(trade.fee)
  party.save()

  let counterparty = createOrLoadUser(Address.fromBytes(trade.counterparty))
  counterparty.completed = counterparty.completed.plus(ONE)
  counterparty.accepted = counterparty.accepted.plus(ONE)
  counterparty.save()
}

export function handleTradeCanceled(event: TradeCanceled): void {
  let config = createOrLoadConfig()
  config.canceled = config.canceled.plus(ONE)
  config.save()

  let trade = createOrLoadTrade(event.params.tradeId)
  trade.status = 'Canceled'
  trade.fee = trade.fee.div(BigInt.fromI32(4))
  trade.save()

  let party = createOrLoadUser(Address.fromBytes(trade.party))
  party.completed = party.completed.plus(ONE)
  party.feesInEscrow = party.feesInEscrow.minus(trade.fee.times(BigInt.fromI32(4)))
  party.feesReleased = party.feesReleased.plus(trade.fee)
  party.feesRefunded = party.feesRefunded.plus(trade.fee.times(BigInt.fromI32(3)))
  party.save()

  let counterparty = createOrLoadUser(Address.fromBytes(trade.counterparty))
  counterparty.completed = counterparty.completed.plus(ONE)
  counterparty.canceled = counterparty.accepted.plus(ONE)
  counterparty.save()
}

export function handleTradeCreated(event: TradeCreated): void {
  let config = createOrLoadConfig()

  let party = createOrLoadUser(event.params.from)
  party.feesPaid = party.feesPaid.plus(config.feeAmount);
  party.created = party.created.plus(ONE)
  party.save()

  let counterparty = createOrLoadUser(event.params.counterparty)
  counterparty.received = counterparty.received.plus(ONE)
  counterparty.save()

  let trade = createOrLoadTrade(event.params.tradeId)
  trade.party = party.id
  trade.counterparty = counterparty.id
  trade.save()

  let tradeId = event.params.tradeId
  for (let i = 0, k = event.params.partyAssets.length; i < k; ++i) {
    let value = event.params.partyAssets[i];
    let asset = createOrLoadAsset(tradeId, value._address, party)
    log.warning("Asset Type = {}", [value.assetType.toString()])
    asset.kind = value.assetType == 0 ? 'ERC20' : value.assetType == 1 ? 'ERC1155' : 'ERC721'
    asset.tradeOffered = trade.id
    if (asset.kind == 'ERC20' || asset.kind == 'ERC1155') {
      asset.amount = value.amount
    }
    if (asset.kind == 'ERC1155' || asset.kind == 'ERC721') {
      asset.tokenId = value.id
    }
    asset.tradeOffered = trade.id
    asset.save()
  }

  for (let i = 0, k = event.params.counterpartyAssets.length; i < k; ++i) {
    let value = event.params.counterpartyAssets[i];
    let asset = createOrLoadAsset(tradeId, value._address, counterparty)
    asset.kind = value.assetType == 0 ? 'ERC20' : value.assetType == 1 ? 'ERC1155' : 'ERC721'
    asset.tradeDesired = trade.id
    if (asset.kind == 'ERC20' || asset.kind == 'ERC1155') {
      asset.amount = value.amount
    }
    if (asset.kind == 'ERC1155' || asset.kind == 'ERC721') {
      asset.tokenId = value.id
    }
    asset.save()
  }


}

export function handleTradeRejected(event: TradeRejected): void {
  let config = createOrLoadConfig()
  config.rejected = config.rejected.plus(ONE)
  config.save()

  let trade = createOrLoadTrade(event.params.tradeId)
  trade.status = 'Rejected'
  trade.fee = trade.fee.div(BigInt.fromI32(4))
  trade.save()

  let party = createOrLoadUser(Address.fromBytes(trade.party))
  party.completed = party.completed.plus(ONE)
  party.feesInEscrow = party.feesInEscrow.minus(trade.fee.times(BigInt.fromI32(4)))
  party.feesReleased = party.feesReleased.plus(trade.fee)
  party.feesRefunded = party.feesRefunded.plus(trade.fee.times(BigInt.fromI32(3)))
  party.save()

  let counterparty = createOrLoadUser(Address.fromBytes(trade.counterparty))
  counterparty.completed = counterparty.completed.plus(ONE)
  counterparty.rejected = counterparty.accepted.plus(ONE)
  counterparty.save()
}

export function handleTreasuryUpdated(event: TreasuryUpdated): void {
  let config = createOrLoadConfig()
  config.treasury = event.params.treasury
  config.save()
}

export function handleUnpaused(event: Unpaused): void {
  let config = createOrLoadConfig()
  config.paused = false
  config.save()
}

export function handleUpgraded(event: Upgraded): void {}
