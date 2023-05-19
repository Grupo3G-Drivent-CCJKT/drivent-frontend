import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import Hotels from '../../../components/Hotels';
import { useEffect, useState } from 'react';
import * as hotelsApi from '../../../services/hotelsApi';
import RoomsContainer from '../../../components/Rooms';
import useToken from '../../../hooks/useToken';
import { BodyHotel, ContainerHotel, ImageHotel, SubTitleHotel, TitleHotel } from '../../../components/Hotels/Hotel';
import useTicket from '../../../hooks/api/useTicket';
import WarningPage from '../../../components/WarningPage';
import Button from '@material-ui/core/Button';

export default function Hotel() {
  const [hotels, setHotels] = useState(undefined);
  const [hotelSelected, setHotelSelected] = useState(undefined);
  const [booking, setBooking] = useState(undefined);
  const [showSummary, setShowSummary] = useState(false);
  const token = useToken();
  const { ticket } = useTicket();

  const handleSelectedHotel = (hotel) => {
    if (hotelSelected) {
      if (hotelSelected.id === hotel.id) {
        setHotelSelected(undefined);
        return;
      }
      setHotelSelected(undefined);
    }
    setHotelSelected(hotel);
  };

  useEffect(async() => {
    try {
      const data = await hotelsApi.getHotels(token);
      if (data.booking && data.booking.length === 1) {
        setBooking(data.booking[0]);
        setShowSummary(true);
      }
      setHotels(data.hotels);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (ticket === null || ticket.status !== 'PAID') {
    const pageTitle = 'Escolha de hotel e quarto';
    const warning = 'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem';

    return <WarningPage warning={warning} pageTitle={pageTitle} />;
  }

  if(!ticket.TicketType.includesHotel) {
    const pageTitle = 'Escolha de hotel e quarto';
    const warning = 'O ingresso que você escolheu não inclui hospedagem, escolha as suas atividades';

    return <WarningPage warning={warning} pageTitle={pageTitle} />;
  }

  if (showSummary === true) {
    return (
      <>
        <Title variant="h4">Escolha de hotel e quarto</Title>
        <SubTitle variant="h6">Você já escolheu seu quarto:</SubTitle>
        <ContainerWrapper>
          <ContainerHotel backgroundColor="#FFEED2">
            <ImageHotel src={booking.hotel.image} alt="/" />
            <TitleHotel variant="h6">{booking.hotel.name}</TitleHotel>
            <SubTitleHotel variant="subtitle2">Quarto Reservado</SubTitleHotel>
            <BodyHotel variant="body2">{getRoomType(booking.room)}</BodyHotel>
            <SubTitleHotel variant="subtitle2">Pessoas no seu quarto</SubTitleHotel>
            <BodyHotel variant="body2">{getRoomOccupancyMessage(booking.personCount)}</BodyHotel>
          </ContainerHotel>
        </ContainerWrapper>
        <Button variant="contained" onClick={() => setShowSummary(false)}>
          TROCAR DE QUARTO
        </Button>
      </>
    );
  }

  return (
    <>
      <Title variant="h4">Escolha de hotel e quarto</Title>
      <SubTitle variant="h6">Primeiro, escolha seu hotel</SubTitle>
      <Hotels data={hotels} hotelSelected={hotelSelected} handleChange={handleSelectedHotel} />
      {hotelSelected && (
        <RoomsContainer
          data={hotelSelected.rooms}
          setBooking={setBooking}
          booking={booking}
          setShowSummary={setShowSummary}
        />
      )}
    </>
  );
}

const Title = styled(Typography)`
  margin-bottom: 36px !important;
`;

const SubTitle = styled(Typography)`
  margin-left: 0.4rem;
  color: #8e8e8e;
`;

const ContainerWrapper = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.2rem;
  margin-bottom:1.2rem;
`;

function getRoomType(room) {
  if (room.capacity === 1) {
    return `${room.name} (Single)`;
  } else if (room.capacity === 2) {
    return `${room.name} (Double)`;
  } else if (room.capacity === 3) {
    return `${room.name} (Triple)`;
  } else if (room.capacity === 4) {
    return `${room.name} (Quad)`;
  }
}

function getRoomOccupancyMessage(numPeople) {
  if (numPeople === 1) {
    return 'Você está sozinho!';
  } else {
    return 'Você mais ' + (numPeople - 1) + ' pessoas!';
  }
}
