import styled from 'styled-components';
import { calculateDiffHours, formatTimeRange } from '../../../utils/masks';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import RegisterActivityButton from '../../../components/RegisterActivityButton';

export default function Activity({ data, subscribed, updateSubscriptions }) {
  return (
    <Card height={calculateDiffHours(data.endsAt, data.startsAt) * 80} subscribed={subscribed}>
      <ContainerNameTime>
        <Name>{data.name}</Name>
        <Time>{formatTimeRange(data.startsAt, data.endsAt)}</Time>
      </ContainerNameTime>
      <ContainerIcon available={data.available > 0}>
        {subscribed ? (
          <>
            <AiOutlineCheckCircle color='#078632' size={23} />
            <Subscribed>{'Inscrito'}</Subscribed>
          </>
        ) : data.available > 0 ? (
          <RegisterActivityButton updateSubscriptions={updateSubscriptions} activity={data}></RegisterActivityButton>
        ) : (
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
    background-color: ${props => props.subscribed ? '#D0FFDB' : '#F1F1F1'};
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
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
    color: #343434;
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
      cursor: ${props => props.available ? 'pointer' : 'not-allowed'};
    };
    
`;

const Soldout = styled.p`
    font-family: 'Roboto';
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #CC6666;
`;

const Subscribed = styled.p`
    font-family: 'Roboto';
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #078632;
`;
