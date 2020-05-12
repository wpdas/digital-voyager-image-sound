import styled from 'styled-components';

interface FileProps {
  accept: string;
}

const FileInput = styled.input.attrs(({ accept }: FileProps) => ({
  type: 'file',
  accept,
}))`
  display: none;
`;

export default FileInput;
