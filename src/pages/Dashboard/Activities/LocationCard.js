import styled from 'styled-components';
import Activity from './Activity';

export default function LocationCard({ data }) {
  return (
    <CardLocation>
      <Title variant='h6'>{data?.name}</Title>
      <CardPrincipal>
        {data && data.activities.map(acti => <Activity key={acti.id} data={acti} />)}
      </CardPrincipal>
    </CardLocation>
  );
}

const CardLocation = styled.div`
    width: 290px;
    height: 100%;
    display: flex;
    flex-shrink:0;
    flex-direction: column;
    justify-content: space-between;
`;

const Title = styled.p`
    text-align: center;
    font-family: 'Roboto';
    font-size: 17px;
    line-height: 20px;
`;

const CardPrincipal = styled.div`
    width: 100%;
    height: 390px;
    overflow-y:auto;
    overflow-x:hidden;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 5px 0 0;
    /* background-color:bisque; */
    &::-webkit-scrollbar {
        width: 6px;
    }
   
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px white; 
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: hsla(218, 78%, 90%, 1); 
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
