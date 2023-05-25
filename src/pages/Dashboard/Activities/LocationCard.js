import styled from 'styled-components';
import Activity from './Activity';

export default function LocationCard({ data }) {
  return (
    <CardLocation>
      <Title variant='h6'>{data.name}</Title>
      <CardPrincipal>
        {data.Activities.map(acti => <Activity key={acti.id} data={acti} />)}
      </CardPrincipal>
    </CardLocation>
  );
}

const CardLocation = styled.div`
    width: 290px;
    height: 100%;
    display: flex;
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
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    &::-webkit-scrollbar {
        width: 5px;
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
    }
`;
