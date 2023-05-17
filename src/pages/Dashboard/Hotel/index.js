import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import Hotels from '../../../components/Hotels';
import { useEffect, useState } from 'react';
import * as hotelsApi from '../../../services/hotelsApi';
import RoomsContainer from '../../../components/Rooms';
import useToken from '../../../hooks/useToken';
import useTicket from '../../../hooks/api/useTicket';
import WarningPage from '../../../components/WarningPage';

export default function Hotel() {
  const [hotels, setHotels] = useState(undefined);
  const [hotelSelected, setHotelSelected] = useState(undefined);
  const [bookingId, setBookingId] = useState(undefined);
  const token = useToken();
  const { ticket } = useTicket();

  useEffect(async() => {
    try {
      const data = await hotelsApi.getHotels(token);
      console.log(data);
      setHotels(data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if(ticket === null || ticket.status !=='PAID') {
    const pageTitle = 'Escolha de hotel e quarto';
    const warning = 'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem';

    return <WarningPage warning={warning} pageTitle={pageTitle} />;
  }

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

  return (
    <>
      <Title variant='h4'>Escolha de hotel e quarto</Title>
      <SubTitle variant='h6'>Primeiro, escolha seu hotel</SubTitle>
      <Hotels data={hotels} hotelSelected={hotelSelected} handleChange={handleSelectedHotel} />
      {hotelSelected && <RoomsContainer data={hotelSelected.rooms} bookingId={bookingId} setBookingId={setBookingId}/>}
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
