import React from 'react';

import { AudioContainer } from './styles';

interface AudioProps {
  audioRef: React.RefObject<HTMLAudioElement> | null | undefined;
  onTimeUpdate?: (
    event?: React.SyntheticEvent<HTMLAudioElement, Event> | undefined
  ) => void;
}

const Audio: React.FC<AudioProps> = ({
  audioRef,
  onTimeUpdate,
}: AudioProps) => {
  return (
    <AudioContainer
      ref={audioRef}
      onDurationChange={onTimeUpdate}
      onTimeUpdate={onTimeUpdate}
    />
  );
};

export default Audio;
