import React from 'react';
import { Container, Canvas } from './styles';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement> | null | undefined;
  width: number;
  height: number;
}

const VisualizerCanvas: React.FC<Props> = ({
  canvasRef,
  width,
  height,
}: Props) => {
  return (
    <Container>
      <Canvas ref={canvasRef} width={width} height={height} />
    </Container>
  );
};

export default VisualizerCanvas;
