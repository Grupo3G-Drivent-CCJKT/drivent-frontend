import styled from 'styled-components';
import HotelCard from './Hotel';

export default function Hotels({ data, handleChange, hotelSelected }) {
  return (
    <ContainerWrapper>{data && data.map((hotel) => {
      let background = hotelSelected && hotelSelected.id === hotel.id ? '#FFEED2' : '#F1F1F1';
      return <HotelCard key={hotel.id} data={hotel} handleChange={handleChange} backgroundColor={background} />;
    })}</ContainerWrapper>
  );
}

const ContainerWrapper = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.2rem;
`;
