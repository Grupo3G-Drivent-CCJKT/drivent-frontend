import { useState } from 'react';
import { locationsActivitiesData } from './mockActivieties';
import styled from 'styled-components';
import LocationCard from './LocationCard';

export default function Locations({ dateSelected }) {
  const [locations, setLocations] = useState(locationsActivitiesData);

  return (
    <Container selected={dateSelected}>
      {locations && locations.map(local => <LocationCard key={local.id} data={local} />)}
    </Container>
  );
}

const Container = styled.div`
    display: ${props => props.selected ? 'flex' : 'none'};
    justify-content: baseline;
    height: 420px;
    margin-top: 60px;
    /* overflow-x: auto; */
    /* overflow-y:auto; */
    /* &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: #142C48; 
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #3d4388; 
    } */
`;
