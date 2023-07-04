import { BigInt } from "@graphprotocol/graph-ts"
import {
  Tradescrow,
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
import { ExampleEntity } from "../generated/schema"

export function handleAdminChanged(event: AdminChanged): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from)

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.previousAdmin = event.params.previousAdmin
  entity.newAdmin = event.params.newAdmin

  // Entities can be written to the store with `.save()`
  entity.save()

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

export function handleFeePaid(event: FeePaid): void {}

export function handleFeeRefunded(event: FeeRefunded): void {}

export function handleFeeReleased(event: FeeReleased): void {}

export function handleFeeUpdated(event: FeeUpdated): void {}

export function handleInitialized(event: Initialized): void {}

export function handlePaused(event: Paused): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleTradeAccepted(event: TradeAccepted): void {}

export function handleTradeCanceled(event: TradeCanceled): void {}

export function handleTradeCreated(event: TradeCreated): void {}

export function handleTradeRejected(event: TradeRejected): void {}

export function handleTreasuryUpdated(event: TreasuryUpdated): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handleUpgraded(event: Upgraded): void {}
