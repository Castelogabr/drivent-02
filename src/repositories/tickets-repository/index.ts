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

async function getAllTypes() {
  return await prisma.ticketType.findMany();
}

async function getTicket(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketsRepositories = {
  getAllTypes,
  getTicket,
  createTicket,
};

export default ticketsRepositories;
