import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PaymentConclude from './PaymentConclude';
import CreditCard from './CreditCard';
import useTicket from '../../hooks/api/useTicket';

export default function PayTicket() {
  const { ticket, ticketLoading } = useTicket();
  const pageTitle = 'Ingresso e pagamento';

  function toBRL(value) {
    return (value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  return (
    <>
      <StyledTypography variant="h4">{pageTitle}</StyledTypography>
      <StyledTypography variant="h6" color='textSecondary'>Ingresso escolhido</StyledTypography>
      {
        !ticketLoading && ticket?.TicketType && <>
          <StyledButton>
            {ticket.TicketType.isRemote && 'Online'}
            {(!ticket.TicketType.isRemote && !ticket.TicketType.includesHotel) && 'Presencial + Sem Hotel'}
            {(!ticket.TicketType.isRemote && ticket.TicketType.includesHotel) && 'Presencial + Com Hotel'}
            <br />
            {toBRL(ticket.TicketType.price)}
          </StyledButton>
          <StyledTypography variant="h6" color='textSecondary'>Pagamento</StyledTypography>
          {ticket.status === 'PAID' && <PaymentConclude/>}
          {ticket.status === 'RESERVED' && <CreditCard/>}
        
        </>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin: 20px 0 !important;
`;

const StyledButton = styled(Button)`
    margin-right: 20px!important;
    border-radius: 20px!important;
    text-transform:none!important;
    font-size: 16px!important;
    width: 290px;
    height: 108px;
    aspect-ratio: 1;
    background-color: #FFEED2!important;
    h1{
      color: #898989;
    }
`;
