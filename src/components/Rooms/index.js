import { useEffect, useState } from 'react';
import Room from './Room';
import styled from 'styled-components';
import * as roomApi from '../../services/roomApi';
import useToken from '../../hooks/useToken';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import useCreateBooking from '../../hooks/api/useCreateBooking';
import { toast } from 'react-toastify';
import useChengeBooking from '../../hooks/api/useChangeBooking';

export default function RoomsContainer({ hotelId }) {
  const token = useToken();
  const [rooms, setRooms] = useState(undefined);
  const [selectedButton, setSelectedButton] = useState(null);
  const [roomId, setRoomId] = useState(undefined);
  const { createBookingLoading, createBooking } = useCreateBooking();
  const { changeBookingLoading, changeBooking } = useChengeBooking();
  const [bookingId, setBookingId] = useState(undefined);

  useEffect(async () => {
    try {
      const data = await roomApi.getRoomsInformations(hotelId, token);
      setRooms(data);
    } catch (error) {
      console.log(error.message);
    }
  }, [hotelId]);

  function handleButtonClick(id) {
    if (selectedButton !== id) {
      setSelectedButton(id);
      setRoomId(id);
    } else {
      setSelectedButton(null);
      setRoomId(undefined);
    }
  }

  async function submitBooking() {
    try {
      if (bookingId === undefined) {
        const result = await createBooking(roomId);
        toast('Hotel reservado com sucesso!');
        setBookingId(result);
      } else {
        const result = await changeBooking(roomId, bookingId);
        toast('Hotel alterado com sucesso!');
        setBookingId(result);
      }
    } catch (error) {
      toast(`Falha na reserva do hotel. ${error.response.data.message}`);
    }
  }

  return (
    <>
      <SubTitle variant="h6">Ótima pedida! Agora escolha seu quarto:</SubTitle>
      <ContainerWrapper>
        {rooms !== undefined &&
          rooms.map((el) => (
            <Room
              key={el.id}
              data={el}
              selected={selectedButton === el.id ? true : false}
              onRoomSelect={handleButtonClick}
            />
          ))}
      </ContainerWrapper>
      {selectedButton !== null && (
        <Button variant="contained" onClick={submitBooking} disabled={createBookingLoading || changeBookingLoading}>
          RESERVAR QUARTO
        </Button>
      )}
    </>
  );
}

const ContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  padding-top: 30px;
`;

const SubTitle = styled(Typography)`
  margin-left: 0.4rem;
  color: #8e8e8e;
`;
