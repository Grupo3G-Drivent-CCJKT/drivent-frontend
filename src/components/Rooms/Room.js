import styled from 'styled-components';
import Person from './PersonIcon';
import { useEffect, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';

export default function Room({ data, selected, onRoomSelect }) {
  const {
    id,
    name,
    capacity,
    hotelId,
    _count: { Booking: occupiedQuantity },
  } = data;
  const [disabled, setDisabled] = useState(false);
  const [numberVacacies, setNumberVacacies] = useState([]);

  function numberVacancies(capacity, occupiedQuantity) {
    if (capacity === occupiedQuantity) setDisabled(true);
    const avaliableQauntity = capacity - occupiedQuantity;
    const arr = new Array(avaliableQauntity + occupiedQuantity);
    arr.fill(true, 0, avaliableQauntity);
    arr.fill(false, avaliableQauntity);
    setNumberVacacies(arr);
  }

  useMemo(() => {
    numberVacancies(capacity, occupiedQuantity);
  }, [capacity, occupiedQuantity]);

  // useEffect(() => {
  //   if (capacity === occupiedQuantity) setDisabled(true);
  //   const avaliableQauntity = capacity - occupiedQuantity;
  //   const arr = new Array(avaliableQauntity + occupiedQuantity);
  //   arr.fill(true, 0, avaliableQauntity);
  //   arr.fill(false, avaliableQauntity);
  //   setNumberVacacies(arr);
  // }, []);

  function handleRoomSelect(e) {
    e.preventDefault();
    onRoomSelect(id);
  }

  return (
    <RoomTypeBox disabled={disabled} selected={selected} onClick={handleRoomSelect}>
      <RoomName>{name}</RoomName>
      <VacanciesRoomBox>
        {numberVacacies.map((el, i) => (
          <Person key={i} avaliable={el} disabled={disabled} selected={selected && i === 0} />
        ))}
      </VacanciesRoomBox>
    </RoomTypeBox>
  );
}

const RoomTypeBox = styled(Button)`
  width: 190px;
  height: 45px;
  border: 1px solid #cecece !important;
  border-radius: 10px !important;
  margin: 0 8px 16px 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 12px !important;
  ${(props) => (props.selected ? 'background: #FFEED2!important;' : 'background: #FFF!important;')};
  &:disabled {
    background: #e9e9e9 !important;
  }
`;

const RoomName = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #454545;
  &:disabled {
    color: #9d9d9d;
  }
`;

const VacanciesRoomBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
