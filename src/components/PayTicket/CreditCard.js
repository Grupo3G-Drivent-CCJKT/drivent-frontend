import React from 'react';
import Cards from 'react-credit-cards';
import { OutlinedInput } from '@material-ui/core';
import 'react-credit-cards/es/styles-compiled.css';
import { useState } from 'react';
import styled from 'styled-components';

export default function CreditCard() {
  const [ creditCard, setCreditCard ] = useState({ number: '', cvc: '', expiry: '', name: '' });

  return (
    <CreditCardContainer>
      <Cards
        number={creditCard.number}
        cvc={creditCard.cvc}
        expiry={creditCard.expiry}
        name={creditCard.name}/>
      <Form>
        <BigInput placeholder='Número do cartão'></BigInput>
        <BigInput placeholder='Nome'></BigInput>
        <MiddleInput placeholder='Validade'></MiddleInput>
        <ShortInput placeholder='CVC'></ShortInput>
      </Form>
    </CreditCardContainer>
  );
};

const CreditCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 706px;
  height: 225px;
`;

const Form = styled.form`
    margin-left: 40px;
`;

const BigInput = styled(OutlinedInput)`
    width: 100% !important;
    margin-bottom: 14px !important;
`;

const MiddleInput = styled(OutlinedInput)`
    width: 60% !important;
    margin-right: 15px !important;
`;

const ShortInput = styled(OutlinedInput)`
    width: 36% !important;
`;
