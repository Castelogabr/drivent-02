import paymentsRepositories from '@/repositories/payments-repository';
import ticketsRepositories from '@/repositories/tickets-repository';
import { notFoundError, unauthorizedError } from '@/errors';
import { CardData } from '@/protocols';

async function getPaymentByTicketId(ticketId: number, userId: number) {
  const ticket = await ticketsRepositories.findTickeWithTypeById(ticketId);
  if (!ticket) throw notFoundError();

  const userTicket = await ticketsRepositories.getTicketByIdAndUserId(ticketId, userId);
  if (!userTicket) throw unauthorizedError();
  const payment = await paymentsRepositories.findPayment(ticketId);

  return payment;
}

async function postPayment(userId: number, ticketId: number, cardData: CardData) {
  const ticket = await ticketsRepositories.findTickeWithTypeById(ticketId);
  if (!ticket) throw notFoundError();

  const userTicket = await ticketsRepositories.getTicketByIdAndUserId(ticketId, userId);
  if (!userTicket) throw unauthorizedError();

  const payment = await paymentsRepositories.postPayment({
    ticketId: ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  });

  return payment;
}

const paymentsService = {
  getPaymentByTicketId,
  postPayment,
};

export default paymentsService;
