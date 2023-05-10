import Room from './Room';
import styled from 'styled-components';

export default function RoomsContainer() {
  return (
    <>
      Ótima pedida! Agora escolha seu quarto:
      <ContainerWrapper>
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
      </ContainerWrapper>
    </>
  );
}

const ContainerWrapper = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  padding-top: 30px;
`;
