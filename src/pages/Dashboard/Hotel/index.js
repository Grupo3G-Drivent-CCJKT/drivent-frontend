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

export default function Hotel() {
  const [hotels, setHotels] = useState(undefined);
  const [hotelSelected, setHotelSelected] = useState(undefined);
  const [booking, setBooking] = useState(undefined);
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
      }
      setHotels(data.hotels);
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  
  if(ticket === null || ticket.status !=='PAID') {
    const pageTitle = 'Escolha de hotel e quarto';
    const warning = 'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem';

    return <WarningPage warning={warning} pageTitle={pageTitle} />;
  }

  if (booking && booking.id) {
    return (
      <>
        <Title variant='h4'>Escolha de hotel e quarto</Title>
        <SubTitle variant='h6'>Você já escolheu seu quarto:</SubTitle>
        <ContainerWrapper>
          <ContainerHotel backgroundColor="#FFEED2">
            <ImageHotel src={booking.hotel.image} alt="/" />
            <TitleHotel variant='h6'>{booking.hotel.name}</TitleHotel>
            <SubTitleHotel variant='subtitle2'>Quarto Reservado</SubTitleHotel>
            <BodyHotel variant='body2'>{getRoomType(booking.room)}</BodyHotel>
            <SubTitleHotel variant='subtitle2'>Pessoas no seu quarto</SubTitleHotel>
            <BodyHotel variant='body2'>{getRoomOccupancyMessage(booking.personCount)}</BodyHotel>
          </ContainerHotel>
        </ContainerWrapper>
      </>
    );
  }

  return (
    <>
      <Title variant='h4'>Escolha de hotel e quarto</Title>
      <SubTitle variant='h6'>Primeiro, escolha seu hotel</SubTitle>
      <Hotels data={hotels} hotelSelected={hotelSelected} handleChange={handleSelectedHotel} />
      {hotelSelected && <RoomsContainer data={hotelSelected.rooms} setBooking={setBooking} />}
    </>
  );
}

const Title = styled(Typography)`
  margin-bottom: 36px!important;
`;

const SubTitle = styled(Typography)`
  margin-left: 0.4rem;
  color: #8E8E8E;
`;

const ContainerWrapper = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.2rem;
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
    return 'Você mais ' + ( numPeople - 1 ) + ' pessoas!';
  }
}
