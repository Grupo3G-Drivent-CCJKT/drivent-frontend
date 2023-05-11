import WarningPage from '../../../components/WarningPage';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import styled from 'styled-components';
import useCreateTicket from '../../../hooks/api/useCreateTicket';
import { toast } from 'react-toastify';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const [ modal, setModal] = useState(undefined);
  const [ ticket, setTicket] = useState(undefined);
  const { createTicket, createTicketLoading } = useCreateTicket();
  
  const pageTitle = 'Ingresso e pagamento';
  if (!enrollment) {
    const warning = 'Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso';

    return <WarningPage warning={warning} pageTitle={pageTitle}/>;
  }

  let ticketTypes = [{ id: 1, name: 'Online', price: 20000, isRemote: true, includesHotel: false },
    { id: 2, name: 'Presencial sem hotel', price: 40000, isRemote: false, includesHotel: false },
    { id: 3, name: 'Presencial com hotel', price: 60000, isRemote: false, includesHotel: true }];
  
  let ticketsWithoutHotel = ticketTypes.filter(t => t.includesHotel === false);

  function selectModal(event, ticketChoice) {
    event.target.selected = !event.target.selected;
    if (ticketChoice.name === modal) {
      setModal(false);
      setTicket(undefined);
      return;
    };
    setModal(ticketChoice.name);
    if (ticketChoice.isRemote) setTicket(ticketTypes.find(t => t.id === ticketChoice.id));
  }
  function toBRL(value) {
    return (value/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  async function submitTicket() {
    try {
      await createTicket(ticket.id);
      toast('Ingresso reservado com sucesso!');
    } catch (error) {
      toast(`Falha na reserva do ingresso. ${error.response.data.message}`);
    }
  }

  return (
    <>
      <StyledTypography variant="h4">{pageTitle}</StyledTypography>
      <StyledTypography variant="h6" color='textSecondary'>Primeiro, escolha sua modalidade de ingresso</StyledTypography>
      {ticketsWithoutHotel.map(e => <StyledButton selected={modal === e.name} variant="outlined" onClick={(event) => selectModal(event, e)} key={e.id}>{e.name.split(' ')[0]} <br/>
        {toBRL(e.price)}</StyledButton>)}
      {ticket && <>

        <StyledTypography variant="h6" color='textSecondary'> 
        Fechado! O total ficou em {toBRL(ticket.price)}. Agora é só confirmar:
        </StyledTypography>
        <Button variant='contained' onClick={submitTicket} disabled={createTicketLoading}>RESERVAR INGRESSO</Button>
      </>}
    </>
  );
}  

const StyledTypography = styled(Typography)`
  margin: 20px 0 !important;
`;

const StyledButton = styled(Button)`
    margin-right: 20px!important;
    border-radius: 20px!important;
    width: 145px;
    aspect-ratio: 1;
    ${props => props.selected ? 'background-color: #FFEED2!important;' : ' '}
`;
