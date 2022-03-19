import {
  Tradescrow,
  AppFeeChanged,
  OwnershipTransferred,
  Paused,
  SwapCancelled,
  SwapClosed,
  SwapExecuted,
  SwapInitiated,
  SwapProposed,
  Unpaused
} from "../generated/Tradescrow/Tradescrow"
import { Coin, Nft, Offer, Swap, App } from "../generated/schema"

export function handleAppFeeChanged(event: AppFeeChanged): void {
  let entity = new App(event.address.toHex())
  entity.fee = event.params.fee
  entity.owner = event.transaction.from.toHex()
  entity.paused = false
  entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let entity = new App(event.address.toHex())
  entity.owner = event.params.newOwner.toHex()
  entity.save()
}

export function handlePaused(event: Paused): void {
  let entity = new App(event.address.toHex())
  entity.paused = true
  entity.save()
}

export function handleSwapCancelled(event: SwapCancelled): void {
  let entity = new Swap(event.params.swapId.toString())
  entity.open = false
  entity.cancelling = true
  entity.save()
}

export function handleSwapClosed(event: SwapClosed): void {
  let entity = new Swap(event.params.swapId.toString())
  entity.open = false
  entity.cancelling = false
  entity.save()
}

export function handleSwapExecuted(event: SwapExecuted): void {
  let entity = new Swap(event.params.swapId.toString())
  entity.executed = true
  entity.save()
}

export function handleSwapInitiated(event: SwapInitiated): void {
  let app = App.load(event.address.toHex())
  let entity = new Swap(event.params.swapId.toString())
  let target = new Offer(`${entity.id}-${event.params.to.toHex()}`)
  target.fee = app.fee
  target.address = event.params.to.toHex()
  target.native = event.params.offer.native
  target.coins = event.params.offer.coins.map(coin => {
    let c = new Coin(`${target.id}-${coin.addr.toHex()}`)
    c.address = coin.addr.toHex()
    c.amount = coin.amount
    c.save()
    return c
  })
  target.nfts = event.params.offer.nfts.map(nft => {
    let n = new Nft(`${target.id}=${nft.addr.toHex()}=${nft.id.toString()}`)
    n.address = nft.addr.toHex()
    n.amount = nft.amount
    n._id = nft.id
    n.save()
    return n
  })
  target.save()
  entity.target = target
  entity.save()
}

export function handleSwapProposed(event: SwapProposed): void {
  let app = App.load(event.address.toHex())
  let entity = new Swap(event.params.swapId.toString())
    entity.open = true
  entity.executed = false
  let initiator = new Offer(`${entity.id}-${event.params.from.toHex()}`)
  initiator.fee = app.fee
  initiator.address = event.params.offer.addr.toHex()
  initiator.native = event.params.offer.native
  initiator.coins = event.params.offer.coins.map(coin => {
    let c = new Coin(`${initiator.id}-${coin.addr.toHex()}`)
    c.address = coin.addr.toHex()
    c.amount = coin.amount
    c.save()
    return c
  })
  initiator.nfts = event.params.offer.nfts.map(nft => {
    let n = new Nft(`${initiator.id}=${nft.addr.toHex()}=${nft.id.toString()}`)
    n.address = nft.addr.toHex()
    n.amount = nft.amount
    n._id = nft.id
    n.save()
    return n
  })
  initiator.save()
  entity.initiator = initiator
  let target = new Offer(`${entity.id}-${event.params.to.toHex()}`)
  target.address = event.params.to.toHex()
  target.save()
  entity.target = target
  entity.save()
}

export function handleUnpaused(event: Unpaused): void {
  let entity = new App(event.address.toHex())
  entity.paused = false
  entity.save()
}
