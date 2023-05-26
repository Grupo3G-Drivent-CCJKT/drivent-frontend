import { useState } from 'react';
import { locationsActivitiesData } from './mockActivieties';
import styled from 'styled-components';
import LocationCard from './LocationCard';

export default function Locations({ dateSelected }) {
  const [locations, setLocations] = useState(locationsActivitiesData);
  console.log(locations);
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
    width:870px;
    margin-top: 60px;
    /* background-color:; */
    overflow-x: auto;
    &::-webkit-scrollbar {
        height: 8px;
    }
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px white; 
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: hsla(218, 78%, 95%, 1); 
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: hsl(220, 70%, 47%);
      }
    &::-webkit-scrollbar-track:hover {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
    }
`;
