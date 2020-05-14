import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Canvas = styled.canvas`
  max-width: 58%;
  background: #000000;

  @media (max-width: 700px) {
    flex-direction: column;
    max-width: 90%;
  }
`;
