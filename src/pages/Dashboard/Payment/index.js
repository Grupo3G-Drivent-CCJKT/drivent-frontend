import WarningPage from '../../../components/WarningPage';
import useEnrollment from '../../../hooks/api/useEnrollment';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const pageTitle = 'Ingresso e pagamento';
  if (!enrollment) {
    const warning = 'Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso';

    return <WarningPage warning={warning} pageTitle={pageTitle}/>;
  }
  return 'Pagamento: Em breve!';
}
