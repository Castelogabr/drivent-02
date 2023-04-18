import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;

  try {
    if (!ticketTypeId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const ticket = await ticketsService.createTickets(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getAllTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.getAllTicketsTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const userTicket = await ticketsService.getUserAllTickets(userId);
    return res.status(httpStatus.OK).send(userTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
