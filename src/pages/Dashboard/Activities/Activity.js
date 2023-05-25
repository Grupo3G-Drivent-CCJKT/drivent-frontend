import styled from 'styled-components';
import { calculateDiffHours, formatTimeRange } from '../../../utils/masks';
import { IoCloseCircleOutline } from 'react-icons/io5';
import RegisterActivityButton from '../../../components/RegisterActivityButton';

export default function Activity({ data }) {
  return (
    <Card height={calculateDiffHours(data.endsAt, data.startsAt) * 80}>
      <ContainerNameTime>
        <Name>{data.name}</Name>
        <Time>{formatTimeRange(data.startsAt, data.endsAt)}</Time>
      </ContainerNameTime>
      <ContainerIcon avaliable={data.avaliable > 0}>
        {data.avaliable > 0 ? (
          <RegisterActivityButton activity={data}></RegisterActivityButton>
        ):(
          <>
            <IoCloseCircleOutline color='#CC6666' size={23} />
            <Soldout>{'Esgotado'}</Soldout>
          </>
        )
        }
      </ContainerIcon>
    </Card>
  );
}

const Card = styled.div`
    width: 265px;
    height: ${props => `${props.height}px`};
    background-color: #F1F1F1;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContainerNameTime = styled.div`
    width: 190px;
    padding-left: 10px;
    height: calc(100% - 19px);
    border-right: 1px solid #CFCFCF;
`;

const Name = styled.p`
    font-family: 'Roboto';
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    text-align: left;
    color: #343434
`;

const Time = styled.p`
    font-family: 'Roboto';
    font-size: 12px;
    line-height: 14px;
    text-align: left;
    color: #343434;
    margin-top: 5px;
`;

const ContainerIcon = styled.div`
    width: 64px;
    height: calc(100% - 19px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    :hover {
      cursor: ${props => props.avaliable ? 'pointer' : 'not-allowed' };
    };
    
`;

const Soldout = styled.p`
    font-family: 'Roboto';
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #CC6666;
`;
