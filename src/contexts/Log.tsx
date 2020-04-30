import React, { createContext, useState } from 'react';
import { IconName } from '@blueprintjs/core';

interface LogProviderValue {
  readonly icon: IconName;
  readonly text: string;
  readonly setText: (text: string) => void;
  readonly setIcon: (iconName: IconName) => void;
}

const defaultValue: LogProviderValue = {
  icon: 'cube',
  text: 'Waiting file to be open...',
  setText: () => new Error('setText should be defined'),
  setIcon: () => new Error('setIcon should be defined'),
};

const LogContext = createContext(defaultValue);

interface LogProviderProps {
  children: React.ReactNode;
}

export const LogProvider: React.FC<LogProviderProps> = ({
  children,
}: LogProviderProps) => {
  const [icon, setIcon] = useState<IconName>('cube');
  const [text, setText] = useState('Waiting file to be open');
  const valueBody: LogProviderValue = {
    icon,
    text,
    setIcon,
    setText,
  };

  return (
    <LogContext.Provider value={valueBody}>{children}</LogContext.Provider>
  );
};

export default LogContext;
