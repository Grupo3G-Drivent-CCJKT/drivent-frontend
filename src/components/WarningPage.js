import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function WarningPage({ warning, pageTitle }) {
  return (
    <>
      <StyledTypography variant="h4">{pageTitle}</StyledTypography>
      <Container>
        {warning}
      </Container>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    font-size: 20px;
    height: 550px ;
    color: #8E8E8E;
    font-family: 'Roboto', sans-serif;
`;
