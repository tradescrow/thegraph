import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
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

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createFeePaidEvent(from: Address, amount: BigInt): FeePaid {
  let feePaidEvent = changetype<FeePaid>(newMockEvent())

  feePaidEvent.parameters = new Array()

  feePaidEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  feePaidEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return feePaidEvent
}

export function createFeeRefundedEvent(
  from: Address,
  amount: BigInt
): FeeRefunded {
  let feeRefundedEvent = changetype<FeeRefunded>(newMockEvent())

  feeRefundedEvent.parameters = new Array()

  feeRefundedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  feeRefundedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return feeRefundedEvent
}

export function createFeeReleasedEvent(amount: BigInt): FeeReleased {
  let feeReleasedEvent = changetype<FeeReleased>(newMockEvent())

  feeReleasedEvent.parameters = new Array()

  feeReleasedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return feeReleasedEvent
}

export function createFeeUpdatedEvent(
  from: Address,
  token: Address,
  fee: BigInt
): FeeUpdated {
  let feeUpdatedEvent = changetype<FeeUpdated>(newMockEvent())

  feeUpdatedEvent.parameters = new Array()

  feeUpdatedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  feeUpdatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  feeUpdatedEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )

  return feeUpdatedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createTradeAcceptedEvent(
  from: Address,
  tradeId: BigInt
): TradeAccepted {
  let tradeAcceptedEvent = changetype<TradeAccepted>(newMockEvent())

  tradeAcceptedEvent.parameters = new Array()

  tradeAcceptedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  tradeAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "tradeId",
      ethereum.Value.fromUnsignedBigInt(tradeId)
    )
  )

  return tradeAcceptedEvent
}

export function createTradeCanceledEvent(
  from: Address,
  tradeId: BigInt
): TradeCanceled {
  let tradeCanceledEvent = changetype<TradeCanceled>(newMockEvent())

  tradeCanceledEvent.parameters = new Array()

  tradeCanceledEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  tradeCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "tradeId",
      ethereum.Value.fromUnsignedBigInt(tradeId)
    )
  )

  return tradeCanceledEvent
}

export function createTradeCreatedEvent(
  from: Address,
  tradeId: BigInt,
  counterparty: Address,
  partyAssets: Array<ethereum.Tuple>,
  counterpartyAssets: Array<ethereum.Tuple>
): TradeCreated {
  let tradeCreatedEvent = changetype<TradeCreated>(newMockEvent())

  tradeCreatedEvent.parameters = new Array()

  tradeCreatedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  tradeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tradeId",
      ethereum.Value.fromUnsignedBigInt(tradeId)
    )
  )
  tradeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "counterparty",
      ethereum.Value.fromAddress(counterparty)
    )
  )
  tradeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "partyAssets",
      ethereum.Value.fromTupleArray(partyAssets)
    )
  )
  tradeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "counterpartyAssets",
      ethereum.Value.fromTupleArray(counterpartyAssets)
    )
  )

  return tradeCreatedEvent
}

export function createTradeRejectedEvent(
  from: Address,
  tradeId: BigInt
): TradeRejected {
  let tradeRejectedEvent = changetype<TradeRejected>(newMockEvent())

  tradeRejectedEvent.parameters = new Array()

  tradeRejectedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  tradeRejectedEvent.parameters.push(
    new ethereum.EventParam(
      "tradeId",
      ethereum.Value.fromUnsignedBigInt(tradeId)
    )
  )

  return tradeRejectedEvent
}

export function createTreasuryUpdatedEvent(
  from: Address,
  treasury: Address
): TreasuryUpdated {
  let treasuryUpdatedEvent = changetype<TreasuryUpdated>(newMockEvent())

  treasuryUpdatedEvent.parameters = new Array()

  treasuryUpdatedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  treasuryUpdatedEvent.parameters.push(
    new ethereum.EventParam("treasury", ethereum.Value.fromAddress(treasury))
  )

  return treasuryUpdatedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}
