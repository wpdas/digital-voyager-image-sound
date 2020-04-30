import React, { useEffect, useState, useContext } from 'react';
import {
  Button,
  Navbar,
  Alignment,
  NonIdealState,
  Icon,
} from '@blueprintjs/core';

import LogContext from 'contexts/Log';
import InfoBar from 'components/InfoBar';
import FileContainer from 'containers/FileContainer';

import { dialog } from 'helpers/bridge';

import {
  Container,
  // LeftMenu,
  Content,
  Menu,
  Title,
  Description,
  Info,
} from './styles';

import { setAudioBuffer, startProcess } from 'helpers/sound';

export default function Main() {
  const [fileOpen, setFileOpen] = useState(false);
  const [error, setError] = useState(false);
  const log = useContext(LogContext);

  useEffect(() => {
    dialog.onOpenFile(async (data: Buffer | null) => {
      if (data != null) {
        await setAudioBuffer(data);
        setFileOpen(true);
        setError(false);
      } else {
        setFileOpen(false);
        setError(true);
      }
    });
  }, []);

  useEffect(() => {
    if (fileOpen) {
      log.setIcon('tick');
      log.setText('File opened and ready to be decoded');
    } else if (error) {
      log.setIcon('warning-sign');
      log.setText('No file was selected. Waiting a file to be open...');
    }
  }, [error, fileOpen, log]);

  const handlerOpenFile = () => {
    log.setIcon('folder-open');
    log.setText('Opening file...');
    dialog.showOpenDialog();
  };

  const foo = () => {
    startProcess();
  };

  const icon = (
    <Icon
      icon="folder-open"
      iconSize={Icon.SIZE_LARGE * 3}
      color="rgba(167,182,194,.6)"
    />
  );
  const title = <Title>No file opened</Title>;
  const description = (
    <Description>
      You need to open encoded .wav file
      <br />
      to see the decoded information.
    </Description>
  );

  const noFileOpenInfo = (
    <Info>
      <NonIdealState icon={icon} title={title} description={description} />
    </Info>
  );

  const fileReadContainer = <FileContainer />;

  return (
    <>
      <Container>
        {/* <LeftMenu></LeftMenu> */}
        <Content>
          <Menu>
            <Navbar className="bp3-dark">
              <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Digital Voyager Sound</Navbar.Heading>
                <Navbar.Divider />
                <Button
                  className="bp3-minimal"
                  icon="document"
                  text="Open File"
                  onClick={handlerOpenFile}
                />
                <Button
                  className="bp3-minimal"
                  icon="document"
                  text="Create File"
                  onClick={foo}
                />
              </Navbar.Group>
            </Navbar>
          </Menu>
          {fileOpen ? fileReadContainer : noFileOpenInfo}
        </Content>
        <InfoBar />
      </Container>
    </>
  );
}
