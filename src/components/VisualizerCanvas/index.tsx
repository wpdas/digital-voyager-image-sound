import React from 'react';
import { Container, Canvas } from './styles';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement> | null | undefined;
}

const VisualizerCanvas: React.FC<Props> = ({ canvasRef }: Props) => {
  return (
    <Container>
      <Canvas ref={canvasRef} />
    </Container>
  );
};

export default VisualizerCanvas;
