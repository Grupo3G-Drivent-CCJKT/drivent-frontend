import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function HotelCard({ data, backgroundColor, handleChange }) {
  return (
    <Container backgroundColor={backgroundColor} onClick={e => handleChange(data)}>
      <ImageHotel src={data.image} alt="/" />
      <Title variant='h6'>{data.name}</Title>
    </Container>
  );
}

const Container = styled.div`
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

const ImageHotel = styled.img`
  width: 170px;
  height: 110px;
  border-radius: 5px;
  margin-top: 1rem;
`;

const Title = styled(Typography)`
  margin-top: 0.5rem!important;
  color: #343434;
  width: 84%;
  text-align: left;
`;
