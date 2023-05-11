import styled from 'styled-components';
import Person from './PersonIcon';
import { useEffect, useMemo, useState } from 'react';

export default function Room({ data }) {
  const {
    id,
    name,
    capacity,
    hotelId,
    _count: { Booking: occupiedQuantity },
  } = data;
  const [disabled, setDisabled] = useState(false);
  const [numberVacacies, setNumberVacacies] = useState([]);

  useEffect(() => {
    if (capacity === occupiedQuantity) setDisabled(true);
    const avaliableQauntity = capacity - occupiedQuantity;
    const arr = new Array(avaliableQauntity + occupiedQuantity);
    arr.fill(true, 0, avaliableQauntity);
    arr.fill(false, avaliableQauntity);
    setNumberVacacies(arr);
  }, [capacity, occupiedQuantity]);

  // const createRoomCapactyArray = () => {
  //   const avaliableQauntity = capacity - occupiedQuantity;
  //   const arr = new Array(avaliableQauntity + occupiedQuantity);
  //   arr.fill(true, 0, avaliableQauntity);
  //   arr.fill(false, avaliableQauntity);
  //   setNumberVacacies(arr);
  // };

  //useMemo(() => createRoomCapactyArray(), [capacity, occupiedQuantity]);

  return (
    <RoomTypeBox disabled={disabled}>
      <p>{name}</p>
      <VacanciesRoomBox>
        {numberVacacies.map((el, i) => (
          <Person key={i} avaliable={el} disabled={disabled} />
        ))}
      </VacanciesRoomBox>
    </RoomTypeBox>
  );
}

const RoomTypeBox = styled.button`
  width: 190px;
  height: 45px;
  border: 1px solid #cecece;
  border-radius: 10px;
  margin: 0 8px 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #fff;
  > p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #454545;
  }
  &:disabled {
    background: #e9e9e9;
    p {
      color: #9d9d9d;
    }
  }
`;

const VacanciesRoomBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
