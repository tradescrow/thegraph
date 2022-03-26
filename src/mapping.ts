import {
  AppFeeChanged,
  OwnershipTransferred,
  Paused,
  SwapCancelled,
  SwapClosed,
  SwapExecuted,
  SwapInitiated,
  SwapProposed,
  Tradescrow,
  Unpaused
} from "../generated/Tradescrow/Tradescrow";
import { App, Coin, Nft, Offer, Swap } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleAppFeeChanged(event: AppFeeChanged): void {
  let app = new App(event.address.toHex())
  app.fee = event.params.fee
  app.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let entity = new App(event.address.toHex())
  entity.owner = event.params.newOwner.toHex()
  entity.save()
}

export function handlePaused(event: Paused): void {
  let app = new App(event.address.toHex())
  app.paused = event.block.timestamp
  app.save()
}

export function handleSwapCancelled(event: SwapCancelled): void {
  let offer = new Offer(`${event.params.swapId.toString()}-${event.params.from.toHex()}`)
  offer.cancelled = event.block.timestamp
  offer.save()
}

export function handleSwapClosed(event: SwapClosed): void {
  let swap = new Swap(event.params.swapId.toString())
  swap.closed = event.block.timestamp
  swap.save()
}

export function handleSwapExecuted(event: SwapExecuted): void {
  let swap = new Swap(event.params.swapId.toString())
  swap.executed = event.block.timestamp
  swap.save()
}

export function handleSwapInitiated(event: SwapInitiated): void {
  let app = App.load(event.address.toHex())
  if (app == null) {
    app = new App(event.address.toHex())
  }
  let swap = new Swap(event.params.swapId.toString())
  let target = new Offer(`${swap.id}-${event.params.to.toHex()}`)
  let contract = Tradescrow.bind(event.address)
  let offer = contract.getOfferBySwapId(event.params.swapId, event.params.from)

  target.fee = app.fee
  target.address = event.params.to.toHex()
  target.native = offer.value1

  for (let i=0;i<offer.value2.length;i++) {
    let c = new Coin(`${target.id}-${offer.value2[i].toHex()}`)
    c.address = offer.value2[i].toHex()
    c.amount = offer.value3[i]
    c.save()
    target.coins[i] = c.id
  }
  for (let i=0;i<offer.value4.length;i++) {
    let n = new Nft(`${target.id}-${offer.value4[i].toHex()}-${offer.value6[i].toString()}`)
    n.address = offer.value4[i].toHex()
    n.amount = offer.value5[i]
    n.nftId = offer.value6[i]
    n.save()
    target.nfts[i] = n.id
  }

  target.save()
  swap.target = target.id
  swap.initiated = event.block.timestamp
  swap.save()
}

export function handleSwapProposed(event: SwapProposed): void {
  let app = App.load(event.address.toHex())
  if (app == null) {
    app = new App(event.address.toHex())
  }
  let swap = new Swap(event.params.swapId.toString())
  let initiator = new Offer(`${swap.id}-${event.params.from.toHex()}`)
  let contract = Tradescrow.bind(event.address)
  let offer = contract.getOfferBySwapId(event.params.swapId, event.params.from)

  initiator.fee = app.fee
  initiator.address = event.params.from.toHex()
  initiator.native = offer.value1

  for (let i=0;i<offer.value2.length;i++) {
    let c = new Coin(`${initiator.id}-${offer.value2[i].toHex()}`)
    c.address = offer.value2[i].toHex()
    c.amount = offer.value3[i]
    c.save()
    initiator.coins[i] = c.id
  }
  for (let i=0;i<offer.value4.length;i++) {
    let n = new Nft(`${initiator.id}-${offer.value4[i].toHex()}-${offer.value6[i].toString()}`)
    n.address = offer.value4[i].toHex()
    n.amount = offer.value5[i]
    n.nftId = offer.value6[i]
    n.save()
    initiator.nfts[i] = n.id
  }

  initiator.save()
  swap.initiator = initiator.id
  swap.proposed = event.block.timestamp
  swap.save()
}

export function handleUnpaused(event: Unpaused): void {
  let app = new App(event.address.toHex())
  app.paused = null
  app.save()
}
