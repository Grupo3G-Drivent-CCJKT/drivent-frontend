import { useEffect, useState } from 'react';
import Room from './Room';
import styled from 'styled-components';
import * as roomApi from '../../services/roomApi';
import useToken from '../../hooks/useToken';

export default function RoomsContainer() {
  const token = useToken();
  const [rooms, setRooms] = useState(undefined);

  useEffect(async() => {
    try {
      const data = await roomApi.getRoomsInformations(3, token);
      setRooms(data.Rooms);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <>
      Ótima pedida! Agora escolha seu quarto:
      <ContainerWrapper>
        {rooms !== undefined &&
          rooms.map((el) => <Room key={el.id} data={el} />)}
      </ContainerWrapper>
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
