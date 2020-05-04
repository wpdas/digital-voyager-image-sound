import styled from 'styled-components';

const FileInput = styled.input.attrs(() => ({
  type: 'file',
  accept: '.wav',
}))`
  display: none;
`;

export default FileInput;
