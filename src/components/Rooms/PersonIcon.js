import styled from 'styled-components';
import { BsPersonFill, BsPerson } from 'react-icons/bs';

export default function Person({ avaliable, disabled }) {
  return <>{disabled ? <PersonIconFill disabled={disabled} /> : avaliable ? <PersonIcon /> : <PersonIconFill />}</>;
}

const PersonIconFill = styled(BsPersonFill)`
  color: ${(props) => (props.disabled ? '#8C8C8C' : '#000000')};
  font-size: 20px;
`;

const PersonIcon = styled(BsPerson)`
  font-size: 20px;
`;
