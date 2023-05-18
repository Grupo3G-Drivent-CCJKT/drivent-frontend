import { useMemo, useState } from 'react';
import Room from './Room';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import useCreateBooking from '../../hooks/api/useCreateBooking';
import { toast } from 'react-toastify';
import useChengeBooking from '../../hooks/api/useChangeBooking';

export default function RoomsContainer({ data, setBooking, booking, setShowSummary, setUpdateBooking }) {
  const [rooms, setRooms] = useState(undefined);
  const [selectedButton, setSelectedButton] = useState(null);
  const [roomId, setRoomId] = useState(undefined);
  const { createBookingLoading, createBooking } = useCreateBooking();
  const { changeBookingLoading, changeBooking } = useChengeBooking();

  useMemo(() => {
    setRooms(data);
  }, [data]);

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
      if (booking === undefined) {
        const result = await createBooking(roomId);
        toast('Hotel reservado com sucesso!');
        setBooking(result[0]);
      } else {
        await changeBooking(roomId, booking.id);
        toast('Hotel alterado com sucesso!');
      }
      setUpdateBooking((prev) => !prev);
      setShowSummary(true);
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
