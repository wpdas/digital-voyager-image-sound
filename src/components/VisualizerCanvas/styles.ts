import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* background: #182128; */
  /* border-top: 1px #f5f8fa50 solid; */
`;

export const Canvas = styled.canvas`
  background: #000;
  transform: rotate(180deg);
  border-top: 2px solid #000;
  max-width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
    min-height: 100px;
  }
`;
