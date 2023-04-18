import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createTicket, getAllTypes, getTicket } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/types', getAllTypes).post('/', createTicket).get('/', getTicket);

export { ticketsRouter };
