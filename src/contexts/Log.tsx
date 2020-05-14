import React, { createContext, useState } from 'react';
import { IconName } from '@blueprintjs/core';
import secondsToMMSS from 'helpers/secondsToMMSS';
import packageInfo from '../../package.json';

interface LogProviderValue {
  readonly icon: IconName;
  readonly text: string;
  readonly currentTime: string;
  readonly duration: string;
  readonly setText: (text: string) => void;
  readonly setIcon: (iconName: IconName) => void;
  readonly setTime: (currentTime: number, duration: number) => void;
}

const defaultValue: LogProviderValue = {
  icon: 'cube',
  text: `v${packageInfo.version}`,
  currentTime: '00:00',
  duration: '00:00',
  setText: () => new Error('setText should be defined'),
  setIcon: () => new Error('setIcon should be defined'),
  setTime: () => new Error('setTime should be defined'),
};

const LogContext = createContext(defaultValue);

interface LogProviderProps {
  children: React.ReactNode;
}

export const LogProvider: React.FC<LogProviderProps> = ({
  children,
}: LogProviderProps) => {
  const [icon, setIcon] = useState<IconName>('cube');
  const [text, setText] = useState(`v${packageInfo.version}`);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const valueBody: LogProviderValue = {
    icon,
    text,
    currentTime,
    duration,
    setIcon,
    setText,
    setTime: (currentTime, duration) => {
      setCurrentTime(secondsToMMSS(currentTime));
      setDuration(secondsToMMSS(duration));
    },
  };

  return (
    <LogContext.Provider value={valueBody}>{children}</LogContext.Provider>
  );
};

export default LogContext;
