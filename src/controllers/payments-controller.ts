import httpStatus from 'http-status';
import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketId = Number(req.query.ticketId);
    const { userId } = req;

    if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const payment = await paymentsService.getPaymentByTicketId(ticketId, userId);

    return res.status(httpStatus.OK).send(payment);
  } catch (err) {
    if (err.name === 'UNAUTHORIZED') {
      res.status(httpStatus.UNAUTHORIZED).send();
    } else if (err.name === 'NotFoundError') {
      res.status(httpStatus.NOT_FOUND).send();
    }
    res.status(httpStatus.UNAUTHORIZED).send();
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId, cardData } = req.body;

  try {
    const payment = await paymentsService.postPayment(userId, ticketId, cardData);
    return res.status(httpStatus.OK).send(payment);
  } catch (err) {
    if (!ticketId || !cardData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else if (err.name === 'NotFoundError') {
      res.status(httpStatus.NOT_FOUND).send();
    }
    res.status(httpStatus.UNAUTHORIZED).send();
  }
}
