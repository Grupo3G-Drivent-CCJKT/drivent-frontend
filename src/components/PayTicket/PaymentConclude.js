import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export default function PaymentConclude() {
  return (
    <CheckPaymentContainer>
      <CheckButton />
      <ConfirmPaymentFont><strong>Pagamento confirmado!</strong><br />Prossiga para escolha de hospedagem e atividades</ConfirmPaymentFont>
    </CheckPaymentContainer>
  );
}

const ConfirmPaymentFont = styled(Typography)`
  margin: 20px 0 !important;
  color: #454545 !important;
  font-size: 16px !important;

`;

const CheckPaymentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: -25px;
`;

const CheckButton = styled(IoCheckmarkCircleSharp)`
  color: #36B853;
  width: 40px;
  height: 40px;
  margin-right: 14px;
`;
