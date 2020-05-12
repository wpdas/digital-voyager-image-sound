import React from 'react';
import { Container, Canvas } from './styles';

interface Props {
  width: number;
  height: number;
  canvasRef: React.RefObject<HTMLCanvasElement> | null | undefined;
}

const StageCanvas: React.FC<Props> = ({ canvasRef, width, height }: Props) => {
  return (
    <Container>
      <Canvas ref={canvasRef} width={width} height={height} />
    </Container>
  );
};

export default StageCanvas;
