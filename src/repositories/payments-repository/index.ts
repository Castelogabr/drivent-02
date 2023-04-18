import { prisma } from '@/config';
import { PaymentData } from '@/protocols';

async function findPayment(ticketId: number) {
  return await prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function postPayment(payment: PaymentData) {
  await prisma.ticket.update({
    where: {
      id: payment.ticketId,
    },
    data: {
      status: 'PAID',
    },
  });
  return await prisma.payment.create({
    data: payment,
  });
}

const paymentRepository = {
  findPayment,
  postPayment,
};
export default paymentRepository;
