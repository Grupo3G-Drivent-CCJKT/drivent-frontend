import styled from 'styled-components';
import Person from './PersonIcon';

export default function Room() {
  return (
    <RoomTypeBox>
      <p>101</p>
      <VacanciesRoomBox>
        <Person />
      </VacanciesRoomBox>
    </RoomTypeBox>
  );
}

const RoomTypeBox = styled.div`
  width: 190px;
  height: 45px;
  border: 1px solid #cecece;
  border-radius: 10px;
  margin: 0 8px 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  > p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #454545;
  }
`;

const VacanciesRoomBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
