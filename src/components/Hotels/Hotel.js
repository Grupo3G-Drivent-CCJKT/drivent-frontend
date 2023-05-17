import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function HotelCard({ data, backgroundColor, handleChange }) {
  function getRoomTypes(rooms) {
    const roomTypes = {};
    rooms.forEach((room) => {
      if (room.capacity === 1) {
        roomTypes.Single = true;
      } else if (room.capacity === 2) {
        roomTypes.Double = true;
      } else if (room.capacity === 3) {
        roomTypes.Triple = true;
      } else if (room.capacity === 4) {
        roomTypes.Quad = true;
      }
    });
    const types = Object.keys(roomTypes);
    if (types.length === 0) {
      return '';
    } else if (types.length === 1) {
      return types[0];
    } else {
      const last = types.pop();
      return types.join(', ') + ' and ' + last;
    }
  }

  return (
    <ContainerHotel backgroundColor={backgroundColor} onClick={e => handleChange(data)}>
      <ImageHotel src={data.image} alt="/" />
      <TitleHotel variant='h6'>{data.name}</TitleHotel>
      <SubTitleHotel variant='subtitle2'>Tipos de acomodação:</SubTitleHotel>
      <BodyHotel variant='body2'>{getRoomTypes(data.rooms)}</BodyHotel>
      <SubTitleHotel variant='subtitle2'>Vagas disponíveis:</SubTitleHotel>
      <BodyHotel variant='body2'>{data.totalavailablerooms}</BodyHotel>
    </ContainerHotel>
  );
}

export const ContainerHotel = styled.div`
  width: 200px;
  height: 260px;
  border-radius: 10px;
  background-color: ${props => props.backgroundColor};
  margin-right: 1.1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

export const ImageHotel = styled.img`
  width: 170px;
  height: 110px;
  border-radius: 5px;
  margin-top: 1rem;
`;

export const TitleHotel = styled(Typography)`
  margin-top: 0.5rem!important;
  color: #343434;
  width: 84%;
  text-align: left;
`;

export const SubTitleHotel = styled.p`
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 12px;
  color: #3c3c3c;
  width: 84%;
  text-align: left;
  margin: auto;
  margin: 0;
  padding: 0;
  line-height: 1.5;
`;

export const BodyHotel = styled.p`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 12px;
  color: #3c3c3c;
  width: 84%;
  text-align: left;
  margin: auto;
  margin: 0;
  padding: 0;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;
