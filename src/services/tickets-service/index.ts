import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepositories from '@/repositories/tickets-repository';

async function createTickets(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticketData = await ticketsRepositories.createTicket(enrollment.id, ticketTypeId);

  if (!ticketData) throw notFoundError();

  return ticketData;
}

async function getAllTicketsTypes() {
  const ticketsTypes = await ticketsRepositories.getAllTypes();

  if (!ticketsTypes) throw notFoundError();

  return ticketsTypes;
}

async function getUserAllTickets(id: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(id);
  if (!enrollment) throw notFoundError();

  const userTicket = await ticketsRepositories.getTicket(enrollment.id);

  if (!userTicket) throw notFoundError();

  return userTicket;
}
const ticketService = {
  getAllTicketsTypes,
  getUserAllTickets,
  createTickets,
};

export default ticketService;
