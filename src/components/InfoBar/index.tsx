import React, { useContext } from 'react';
import { H6, Icon } from '@blueprintjs/core';

import LogContext from 'contexts/Log';
import { Container, TextWrapperLeft, TextWrapperRight } from './styles';

export default function InfoBar() {
  const { icon, text, currentTime, duration } = useContext(LogContext);

  return (
    <Container>
      <TextWrapperLeft>
        <Icon icon={icon} iconSize={14} color="#f5f8fa" />
        <H6 style={{ color: '#f5f8fa', fontSize: 12, margin: '0 0 0 12px' }}>
          {text}
        </H6>
      </TextWrapperLeft>
      <TextWrapperRight>
        <Icon icon="time" iconSize={14} color="#f5f8fa" />
        <H6 style={{ color: '#f5f8fa', fontSize: 12, margin: '0 0 0 12px' }}>
          {currentTime} / {duration}
        </H6>
      </TextWrapperRight>
    </Container>
  );
}
