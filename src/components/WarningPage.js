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
    text-align: center;
    font-size: 20px;
    height: 550px ;
    width: 411px;
    color: #8E8E8E;
    margin-left: 200px;
    font-family: 'Roboto', sans-serif;
`;
