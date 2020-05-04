import React from 'react';

import { AudioContainer } from './styles';

interface AudioProps {
  audioRef: React.RefObject<HTMLAudioElement> | null | undefined;
}

const Audio: React.FC<AudioProps> = ({ audioRef }: AudioProps) => {
  return <AudioContainer ref={audioRef} />;
};

export default Audio;
