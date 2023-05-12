import { useEffect, useState } from 'react';
import Room from './Room';
import styled from 'styled-components';
import * as roomApi from '../../services/roomApi';
import useToken from '../../hooks/useToken';
import Button from '@material-ui/core/Button';

export default function RoomsContainer() {
  const token = useToken();
  const [rooms, setRooms] = useState(undefined);
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(async() => {
    try {
      const data = await roomApi.getRoomsInformations(3, token);
      setRooms(data.Rooms);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  function handleButtonClick(roomId) {
    if (selectedButton !== roomId) {
      setSelectedButton(roomId);
    } else {
      setSelectedButton(null);
    }
  }

  return (
    <>
      Ótima pedida! Agora escolha seu quarto:
      <ContainerWrapper>
        {rooms !== undefined &&
          rooms.map((el) => (
            <Room
              key={el.id}
              data={el}
              selected={selectedButton === el.id ? true : false}
              //onClick={(e) => handleButtonClick(e, el.id)}
              onRoomSelect={handleButtonClick}
            />
          ))}
      </ContainerWrapper>
      {selectedButton !== null && <Button variant="contained">RESERVAR QUARTO</Button>}
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
