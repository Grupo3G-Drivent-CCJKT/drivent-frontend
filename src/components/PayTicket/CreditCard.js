import React from 'react';
import Cards from 'react-credit-cards-2';
import { OutlinedInput } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useState } from 'react';
import styled from 'styled-components';

export default function CreditCard() {
  const [creditCard, setCreditCard] = useState({ number: '', expiry: '', cvc: '', name: '', focus: '' });
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setCreditCard((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputFocus = (evt) => {
    setCreditCard((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <>
      <CreditCardContainer>
        <Cards
          number={creditCard.number}
          expiry={creditCard.expiry}
          cvc={creditCard.cvc}
          name={creditCard.name}
          focused={creditCard.focus}
        />
        <Form>
          <BigInput
            type='number'
            name='number'
            placeholder='Número do cartão'
            value={creditCard.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <BigInput
            type='string'
            name='name'
            placeholder='Nome'
            value={creditCard.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <MiddleInput
            type='string'
            name='expiry'
            placeholder='Validade'
            value={creditCard.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <ShortInput
            type='string'
            name='cvc'
            placeholder='CVC'
            value={creditCard.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </Form>
      </CreditCardContainer>
      <Button variant='contained'>FINALIZAR PAGAMENTO</Button>
    </>
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
