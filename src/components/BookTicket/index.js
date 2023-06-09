import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import * as ticketApi from '../../services/ticketApi';
import useCreateTicket from '../../hooks/api/useCreateTicket';
import useToken from '../../hooks/useToken';

export default function BookTicket({ setReadyToPay }) {
  const [modal, setModal] = useState(undefined); // true for Online or false for In-person
  const [hotel, setHotel] = useState(undefined); // true for withHotel or false for withoutHotel
  const [ticket, setTicket] = useState(undefined);
  const [ticketTypes, setTicketType] = useState([]);
  const [ticketsWithoutHotel, setTicketsWithoutHotel] = useState([]);
  const [ticketsNotRemote, setTicketsNotRemote] = useState([]);
  const { createTicket, createTicketLoading } = useCreateTicket();
  const token = useToken();

  useEffect(async() => {
    const fetchData = async() => {
      const data = await ticketApi.getTicketTypes(token);
      setTicketType(data);

      const filterTicketsWithoutHotel = data.filter(t => t.includesHotel === false);
      const filterPriceNotRemoteWithoutHotel = data.find(t => t.includesHotel === false && t.isRemote === false).price;
      const filterTicketsNotRemote = data.filter(t => t.isRemote === false);
      filterTicketsNotRemote.forEach(e => e.plusPrice = e.price - filterPriceNotRemoteWithoutHotel);

      setTicketsWithoutHotel([...filterTicketsWithoutHotel]);
      setTicketsNotRemote([...filterTicketsNotRemote]);
    };
    await fetchData();
  }, []);

  const pageTitle = 'Ingresso e pagamento';

  function selectModal(ticketChoice) {
    if (ticketChoice.isRemote === modal) {
      setModal(undefined);
      setHotel(undefined);
      setTicket(undefined);
      return;
    };
    setModal(ticketChoice.isRemote);
    if (ticketChoice.isRemote) {
      setTicket(ticketTypes.find(t => t.id === ticketChoice.id));
      setHotel(undefined);
    }

    else (setTicket(undefined));
  }
  function toBRL(value) {
    return (value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  function selectHotel(ticketChoice) {
    if (ticketChoice.includesHotel === hotel) {
      setHotel(undefined);
      setTicket(undefined);
      return;
    };
    setHotel(ticketChoice.includesHotel);
    setTicket(ticketTypes.find(t => t.id === ticketChoice.id));
  }
  async function submitTicket() {
    try {
      await createTicket(ticket.id);
      toast('Ingresso reservado com sucesso!');
      setReadyToPay(true);
    } catch (error) {
      toast(`Falha na reserva do ingresso. ${error.response ? error.response.data.message : ''}`);
    }
  }

  return (
    <>
      <StyledTypography variant="h4">{pageTitle}</StyledTypography>
      <StyledTypography variant="h6" color='textSecondary'>Primeiro, escolha sua modalidade de ingresso</StyledTypography>
      {ticketsWithoutHotel.map(e => <StyledButton selected={modal === e.isRemote} variant="outlined" onClick={() => selectModal(e)} key={e.id}>{e.isRemote ? 'Online' : 'Presencial'} <br />
        {toBRL(e.price)}</StyledButton>)}
      {modal === false &&
        <>
          <StyledTypography variant="h6" color='textSecondary'>
            Ótimo! Agora escolha sua modalidade de hospedagem
          </StyledTypography>
          {
            ticketsNotRemote.map(e => <StyledButton selected={hotel === e.includesHotel} variant="outlined" onClick={() => selectHotel(e)} key={e.id}>{e.includesHotel ? 'Com Hotel' : 'Sem Hotel'} <br />
              + {toBRL(e.plusPrice)}</StyledButton>)
          }
        </>
      }
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
    text-transform:none!important;
    font-size: 16px!important;
    width: 145px;
    aspect-ratio: 1;
    ${props => props.selected ? 'background-color: #FFEED2!important;' : ' '}
`;
