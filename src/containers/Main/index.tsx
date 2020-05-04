import React, { useState, useContext, useRef } from 'react';
import {
  Button,
  Navbar,
  Alignment,
  NonIdealState,
  Icon,
} from '@blueprintjs/core';

import LogContext from 'contexts/Log';
import InfoBar from 'components/InfoBar';
// import FileContainer from 'containers/FileContainer';

import {
  Container,
  // LeftMenu,
  Content,
  Menu,
  Title,
  Description,
  Info,
} from './styles';

import processSound from 'helpers/processSound';

import FileInput from 'components/FileInput';
import Audio from 'components/Audio';
import VisualizerCanvas from 'components/VisualizerCanvas';
import StageCanvas from 'components/StageCanvas';

export default function Main() {
  const [fileOpen, setFileOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const log = useContext(LogContext);

  const visualizerCanvasRef = useRef<HTMLCanvasElement>(null);
  const stageCanvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlerOpenFile = () => {
    fileInputRef.current?.click();
  };

  const handlerOnSelectFile = () => {
    const files = fileInputRef.current?.files;
    if (files) {
      setFile(files[0]);
      setFileOpen(true);
      log.setIcon('tick');
      log.setText('File opened and ready to be decoded');
    }
    console.log(file);
  };

  const handlerPlayAndDecode = () => {
    const files = fileInputRef.current?.files;
    if (
      visualizerCanvasRef.current &&
      stageCanvasRef.current &&
      audioRef.current &&
      files
    ) {
      processSound(
        visualizerCanvasRef.current,
        stageCanvasRef.current,
        audioRef.current,
        files[0]
      );
    }
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

  const fileReadContainer = (
    <>
      <VisualizerCanvas canvasRef={visualizerCanvasRef} />
      <StageCanvas canvasRef={stageCanvasRef} width={538} height={400} />
    </>
  );

  console.log(noFileOpenInfo, fileReadContainer, fileOpen);

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
              </Navbar.Group>
              {fileOpen ? (
                <Navbar.Group align={Alignment.RIGHT}>
                  <Button
                    className="bp3-minimal"
                    icon="full-stacked-chart"
                    text="Play and Decode"
                    onClick={handlerPlayAndDecode}
                  />
                </Navbar.Group>
              ) : null}
            </Navbar>
          </Menu>
          {fileOpen ? fileReadContainer : noFileOpenInfo}
          <FileInput ref={fileInputRef} onChange={handlerOnSelectFile} />
          <Audio audioRef={audioRef} />
        </Content>
        <InfoBar />
      </Container>
    </>
  );
}
