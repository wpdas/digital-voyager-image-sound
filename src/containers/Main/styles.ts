import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
`;

export const Menu = styled.div`
  user-select: none;
`;

export const AppLogo = styled.img`
  margin-right: 12px;
  cursor: pointer;
`;

export const Title = styled.div`
  color: #f5f8fa;
`;

export const Description = styled.div`
  color: #f5f8fa;
`;

export const Info = styled.div`
  margin-top: 32vh;
  user-select: none;

  @media (max-width: 700px) {
    margin-top: 25vh;
  }
`;

export const MainStage = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 92%; */
  height: calc(100% - 25px);
  justify-content: center;
`;

export const StageWrapper = styled.div`
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 753px;
  max-width: 96%;
  min-height: 446px;
  align-self: center;
  border: 1px solid #000;

  @media (max-width: 700px) {
    min-width: unset;
  }
`;
