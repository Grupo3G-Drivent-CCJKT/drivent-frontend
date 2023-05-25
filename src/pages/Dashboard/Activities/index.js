import { useEffect, useState } from 'react';
import { datesMock } from './mockActivieties';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { maskDate } from '../../../utils/masks';
import Locations from './Locations';
import useTicket from '../../../hooks/api/useTicket';
import WarningPage from '../../../components/WarningPage';
import activitiesApi from '../../../services/activitiesApi';
import useToken from '../../../hooks/useToken';

export default function Activities() {
  const [dates, setDates] = useState(undefined);
  const [dateSelected, setDateSelected] = useState(undefined);
  const { ticket } = useTicket();
  const token = useToken();

  const pageTitle = 'Escolha de atividades';

  useEffect(async() => {
    try {
      const data = await activitiesApi.getActivitiesDates(token);
      setDates(data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (ticket) {
    if (ticket.TicketType.isRemote && ticket.status === 'PAID')
      return (
        <WarningPage
          warning="Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades."
          pageTitle={pageTitle}
        />
      );

    if (ticket.status === 'RESERVED')
      return (
        <WarningPage
          pageTitle={pageTitle}
          warning="Você precisa ter confirmado pagamento antes de fazer a escolha de atividades"
        />
      );
  }

  function handleSelected(date) {
    if (dateSelected) {
      if (date === dateSelected) {
        setDateSelected(undefined);
      } else {
        setDateSelected(date);
      }
    } else {
      setDateSelected(date);
    }
  }

  return (
    <>
      <Title variant="h4">Escolha de atividades</Title>
      <SubTitle variant="h6" selected={dateSelected}>
        Primeiro, filtre pelo dia do evento:
      </SubTitle>
      <ContainerDates>
        {dates &&
          dates.map((date) => (
            <Date key={date} onClick={() => handleSelected(date)} selected={dateSelected && dateSelected === date}>
              {maskDate(date)}
            </Date>
          ))}
      </ContainerDates>
      <Locations dateSelected={dateSelected} />
    </>
  );
}

const Title = styled(Typography)`
  margin-bottom: 36px !important;
`;

const SubTitle = styled(Typography)`
  margin-left: 0.4rem;
  color: #8e8e8e;
  display: ${(props) => (props.selected ? 'none' : 'block')};
`;

const ContainerDates = styled.div`
  display: flex;
  margin-top: 23px;
`;

const Date = styled.div`
  margin-right: 20px;
  width: 130px;
  height: 37px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.selected ? '#FFD37D' : '#E0E0E0')};
  border-radius: 4px;
  font-family: 'Roboto';
  font-size: 15px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.selected ? '#E0E0E0' : '#FFD37D')};
  }
`;
