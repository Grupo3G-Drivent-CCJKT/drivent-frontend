import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import Hotels from '../../../components/Hotels';
import { useEffect, useState } from 'react';
import * as hotelsApi from '../../../services/hotelsApi';
import RoomsContainer from '../../../components/Rooms';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const token = useToken();
  const [hotels, setHotels] = useState(undefined);
  const [hotelSelected, setHotelSelected] = useState(undefined);

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
      console.log(data);
      setHotels(data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <>
      <Title variant='h4'>Escolha de hotel e quarto</Title>
      <SubTitle variant='h6'>Primeiro, escolha seu hotel</SubTitle>
      <Hotels data={hotels} hotelSelected={hotelSelected} handleChange={handleSelectedHotel} />
      {hotelSelected && <RoomsContainer data={hotelSelected.rooms}/>}
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
