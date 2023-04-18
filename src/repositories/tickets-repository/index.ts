import { TicketStatus } from '@prisma/client';
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

async function findTickeWithTypeById(ticketId: number) {
  return await prisma.ticket.findFirst({
    where: { id: ticketId },
    include: { TicketType: true },
  });
}

async function getTicketByIdAndUserId(ticketId: number, userId: number) {
  return await prisma.ticket.findFirst({
    where: { id: ticketId, Enrollment: { userId } },
    include: { Enrollment: true },
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

async function ticketProcessPayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const ticketsRepositories = {
  getAllTypes,
  getTicket,
  createTicket,
  findTickeWithTypeById,
  ticketProcessPayment,
  getTicketByIdAndUserId,
};

export default ticketsRepositories;
