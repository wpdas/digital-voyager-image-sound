import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin-top: 18vh;
  margin-left: auto;
  margin-right: auto;
  min-width: 800px;
  max-width: 850px;
  height: 400px;
  flex-direction: column;
`;

export const Paragraph = styled.p`
  color: #f5f8fa;
`;

export const FileStatus = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

export const ImageDetailWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const ImageDetail = styled.p`
  text-align: center;
  color: #f5f8fa;
  background: #182128;
  width: 20%;
  margin-bottom: 0;
  padding: 16px 0;
`;

export const PreviewImage = styled.img`
  width: 100%;
`;
