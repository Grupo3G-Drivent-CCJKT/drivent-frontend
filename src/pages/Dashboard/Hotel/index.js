import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import Hotels from '../../../components/Hotels';
import { mockHotels } from './mockHotelTest';
import { useState } from 'react';
import RoomsContainer from '../../../components/Rooms';

export default function Hotel() {
  const [hotels, setHotels] = useState(mockHotels);
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

  return (
    <>
      <Title variant='h4'>Escolha de hotel e quarto</Title>
      <SubTitle variant='h6'>Primeiro, escolha seu hotel</SubTitle>
      <Hotels data={hotels} hotelSelected={hotelSelected} handleChange={handleSelectedHotel} />
      {hotelSelected && <RoomsContainer/>}
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
