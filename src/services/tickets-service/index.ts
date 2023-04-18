import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepositories from '@/repositories/tickets-repository';

async function createTickets(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  await ticketsRepositories.createTicket(enrollment.id, ticketTypeId);
}

const ticketsService = {
  createTickets,
};

export default ticketsService;
