import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createTicket } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/types').post('/', createTicket).get('/');

export { ticketsRouter };
