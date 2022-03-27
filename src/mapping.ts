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
  let app = App.load(event.address.toHex())
  if (app == null) {
    app = new App(event.address.toHex())
  }
  app.fee = event.params.fee
  app.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let app = App.load(event.address.toHex())
  if (app == null) {
    app = new App(event.address.toHex())
  }
  app.owner = event.params.newOwner.toHex()
  app.save()
}

export function handlePaused(event: Paused): void {
  let app = App.load(event.address.toHex())
  if (app == null) {
    app = new App(event.address.toHex())
  }
  app.paused = event.block.timestamp
  app.save()
}

export function handleSwapCancelled(event: SwapCancelled): void {
  let offer = Offer.load(`${event.params.swapId.toString()}-${event.params.from.toHex()}`)
  if (offer == null) {
    offer = new Offer(event.address.toHex())
  }
  offer.cancelled = event.block.timestamp
  offer.save()
}

export function handleSwapClosed(event: SwapClosed): void {
  let swap = Swap.load(event.params.swapId.toString())
  if (swap == null) {
    swap = new Swap(event.params.swapId.toString())
  }
  swap.closed = event.block.timestamp
  swap.save()
}

export function handleSwapExecuted(event: SwapExecuted): void {
  let swap = Swap.load(event.params.swapId.toString())
  if (swap == null) {
    swap = new Swap(event.params.swapId.toString())
  }
  swap.executed = event.block.timestamp
  swap.save()
}

export function handleSwapInitiated(event: SwapInitiated): void {
  let app = App.load(event.address.toHex())
  if (app == null) {
    app = new App(event.address.toHex())
  }
  let swap = Swap.load(event.params.swapId.toString())
  if (swap == null) {
    swap = new Swap(event.params.swapId.toString())
  }
  let target = new Offer(`${swap.id}-${event.params.to.toHex()}`)
  let contract = Tradescrow.bind(event.address)
  let offer = contract.getOfferBySwapId(event.params.swapId, event.params.from)

  target.fee = app.fee
  target.address = event.params.to.toHex()
  target.native = offer.value1
  let coins: string[] = []
  for (let i=0;i<offer.value2.length;i++) {
    let c = new Coin(`${target.id}-${offer.value2[i].toHex()}`)
    c.address = offer.value2[i].toHex()
    c.amount = offer.value3[i]
    c.save()
    coins[i] = c.id
  }
  target.coins = coins

  let nfts: string[] = []
  for (let i=0;i<offer.value4.length;i++) {
    let n = new Nft(`${target.id}-${offer.value4[i].toHex()}-${offer.value6[i].toString()}`)
    n.address = offer.value4[i].toHex()
    n.amount = offer.value5[i]
    n.nftId = offer.value6[i]
    n.save()
    nfts[i] = n.id
  }
  target.nfts = nfts

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

  let coins: string[] = []
  for (let i=0;i<offer.value2.length;i++) {
    let c = new Coin(`${initiator.id}-${offer.value2[i].toHex()}`)
    c.address = offer.value2[i].toHex()
    c.amount = offer.value3[i]
    c.save()
    coins[i] = c.id
  }
  initiator.coins = coins

  let nfts: string[] = []
  for (let i=0;i<offer.value4.length;i++) {
    let n = new Nft(`${initiator.id}-${offer.value4[i].toHex()}-${offer.value6[i].toString()}`)
    n.address = offer.value4[i].toHex()
    n.amount = offer.value5[i]
    n.nftId = offer.value6[i]
    n.save()
    nfts[i] = n.id
  }
  initiator.nfts = nfts
  initiator.save()
  swap.initiator = initiator.id
  swap.proposed = event.block.timestamp
  swap.save()
}

export function handleUnpaused(event: Unpaused): void {
  let app = App.load(event.address.toHex())
  if (app == null) {
    app = new App(event.address.toHex())
  }
  app.paused = null
  app.save()
}
