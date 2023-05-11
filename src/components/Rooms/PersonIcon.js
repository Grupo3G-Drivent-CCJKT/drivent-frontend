import styled from 'styled-components';
import { BsPersonFill, BsPerson } from 'react-icons/bs';

export default function Person({ avaliable, disabled, selected }) {
  return (
    <>{disabled ? <DisabledIcon /> : selected ? <SelectedIcon /> : avaliable ? <AvaliableIcon /> : <OccupiedIcon />}</>
  );
}

const DisabledIcon = styled(BsPersonFill)`
  color: #8c8c8c;
  font-size: 20px;
`;

const SelectedIcon = styled(BsPersonFill)`
  color: #ff4791;
  font-size: 20px;
`;

const OccupiedIcon = styled(BsPersonFill)`
  color: #000000;
  font-size: 20px;
`;
const AvaliableIcon = styled(BsPerson)`
  font-size: 20px;
`;
