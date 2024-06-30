import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  PaymentLinkCreated,
  PaymentMade
} from "../generated/PaymentLink/PaymentLink"

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPaymentLinkCreatedEvent(
  creator: Address,
  amount: BigInt,
  title: string,
  description: string,
  guid: string
): PaymentLinkCreated {
  let paymentLinkCreatedEvent = changetype<PaymentLinkCreated>(newMockEvent())

  paymentLinkCreatedEvent.parameters = new Array()

  paymentLinkCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  paymentLinkCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  paymentLinkCreatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  paymentLinkCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  paymentLinkCreatedEvent.parameters.push(
    new ethereum.EventParam("guid", ethereum.Value.fromString(guid))
  )

  return paymentLinkCreatedEvent
}

export function createPaymentMadeEvent(
  payer: Address,
  recipient: Address,
  amount: BigInt,
  fee: BigInt,
  guid: string,
  notes: string
): PaymentMade {
  let paymentMadeEvent = changetype<PaymentMade>(newMockEvent())

  paymentMadeEvent.parameters = new Array()

  paymentMadeEvent.parameters.push(
    new ethereum.EventParam("payer", ethereum.Value.fromAddress(payer))
  )
  paymentMadeEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  paymentMadeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  paymentMadeEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )
  paymentMadeEvent.parameters.push(
    new ethereum.EventParam("guid", ethereum.Value.fromString(guid))
  )
  paymentMadeEvent.parameters.push(
    new ethereum.EventParam("notes", ethereum.Value.fromString(notes))
  )

  return paymentMadeEvent
}
