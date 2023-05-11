import WarningPage from '../../../components/WarningPage';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import styled from 'styled-components';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const [ modal, setModal] = useState(undefined);
  const pageTitle = 'Ingresso e pagamento';
  if (!enrollment) {
    const warning = 'Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso';

    return <WarningPage warning={warning} pageTitle={pageTitle}/>;
  }

  let ticketTypes = [{ id: 1, name: 'Online', price: 20000, isRemote: true, includesHotel: false },
    { id: 2, name: 'Presencial sem hotel', price: 40000, isRemote: false, includesHotel: false },
    { id: 3, name: 'Presencial com hotel', price: 60000, isRemote: false, includesHotel: true }];
  
  let ticketsWithoutHotel = ticketTypes.filter(t => t.includesHotel === false);

  function selectModal(event, ticket) {
    event.target.selected = !event.target.selected;
    if (ticket.name === modal) {
      setModal(false);
      return;
    };
    setModal(ticket.name);
  }

  return (
    <>
      <StyledTypography variant="h4">{pageTitle}</StyledTypography>
      <StyledTypography variant="h6" color='textSecondary'>Primeiro, escolha sua modalidade de ingresso</StyledTypography>
      {ticketsWithoutHotel.map(e => <StyledButton selected={modal === e.name} variant="outlined" onClick={(event) => selectModal(event, e)} key={e.id}>{e.name.split(' ')[0]} <br/>
        {(e.price/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</StyledButton>)}
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
