import { IoLogInOutline } from 'react-icons/io5';
import styled from 'styled-components';
import useCreateRegister from '../../hooks/api/useCreateRegister';
import { toast } from 'react-toastify';

export default function RegisterActivityButton({ activity, updateSubscriptions }) {
  const { available, id } = activity;
  const { createRegister } = useCreateRegister();

  async function createNewRegister() {
    try {
      await createRegister(id);
      toast('Inscrição realizada com sucesso!');
      updateSubscriptions();
    } catch (error) {
      toast(`Houve um erro na sua inscrição. ${error.response.data.message}`);
    }
  }
  return (
    <Container onClick={() => createNewRegister(id)}>
      <IoLogInOutline color='#078632' size={23} />
      <Vacancies>{`${available} vagas`}</Vacancies>
    </Container>
  );
}

const Vacancies = styled.p`
    font-family: 'Roboto';
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #078632;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
