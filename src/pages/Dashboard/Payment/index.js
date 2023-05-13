import WarningPage from '../../../components/WarningPage';
import useEnrollment from '../../../hooks/api/useEnrollment';
import BookTicket from '../../../components/BookTicket';
import useTicket from '../../../hooks/api/useTicket';
import PayTicket from '../../../components/PayTicket';
import { useState } from 'react';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticket } = useTicket();
  const [ readyToPay, setReadyToPay] = useState(false);

  const pageTitle = 'Ingresso e pagamento';
  if (!enrollment) {
    const warning = 'Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso';

    return <WarningPage warning={warning} pageTitle={pageTitle} />;
  }
  if (ticket || readyToPay) return <PayTicket ticket={ticket}/>;

  return (
    <BookTicket setReadyToPay={setReadyToPay}/>
  );
}
