import { Ticket } from '@prisma/client';
import { prisma } from '@/config';

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: 'RESERVED',
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketsRepositories = {
  createTicket,
};

export default ticketsRepositories;
