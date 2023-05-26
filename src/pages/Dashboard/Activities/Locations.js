import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LocationCard from './LocationCard';
import activitiesApi from '../../../services/activitiesApi';
import useToken from '../../../hooks/useToken';

export default function Locations({ dateSelected }) {
  const [locations, setLocations] = useState(undefined);
  const token = useToken();

  useEffect(async() => {
    if (dateSelected) {
      try {
        const data = await activitiesApi.findActivitiesByDate(dateSelected, token);
        setLocations(data);
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [dateSelected]);

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
