import {
  OwnershipTransferred as OwnershipTransferredEvent,
  PaymentLinkCreated as PaymentLinkCreatedEvent,
  PaymentMade as PaymentMadeEvent
} from "../generated/PaymentLink/PaymentLink"
import {
  OwnershipTransferred,
  PaymentLinkCreated,
  PaymentMade
} from "../generated/schema"

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaymentLinkCreated(event: PaymentLinkCreatedEvent): void {
  let entity = new PaymentLinkCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.creator = event.params.creator
  entity.amount = event.params.amount
  entity.title = event.params.title
  entity.description = event.params.description
  entity.guid = event.params.guid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaymentMade(event: PaymentMadeEvent): void {
  let entity = new PaymentMade(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.payer = event.params.payer
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount
  entity.fee = event.params.fee
  entity.guid = event.params.guid
  entity.notes = event.params.notes

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
