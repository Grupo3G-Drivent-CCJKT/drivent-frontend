import { IoLogInOutline } from 'react-icons/io5';
import styled from 'styled-components';

export default function RegisterActivityButton({ activity }) {
  const { avaliable, id } = activity;
  return (
    <>
      <IoLogInOutline color='#078632' size={23} />
      <Vacancies>{`${avaliable} vagas id${id}`}</Vacancies>
    </>
  );}

const Vacancies = styled.p`
    font-family: 'Roboto';
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #078632;
`;