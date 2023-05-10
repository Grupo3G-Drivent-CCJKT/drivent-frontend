import styled from 'styled-components';
import { BsPersonFill, BsPerson } from 'react-icons/bs';

export default function Person() {
  return (
    <>
      <PersonIconFill />
      <PersonIcon />
    </>
  );
}

const PersonIconFill = styled(BsPersonFill)`
  color: #ff4791;
  font-size: 20px;
`;

const PersonIcon = styled(BsPerson)`
  font-size: 20px;
`;
