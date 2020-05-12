import React, { useContext, useRef, useReducer, useEffect } from 'react';
import {
  Button,
  Navbar,
  Alignment,
  NonIdealState,
  Icon,
} from '@blueprintjs/core';

import {
  BitmapWavHeader,
  getBitmapHeaderInfo,
  getTypeIdFromBuffer,
} from 'voyager-edsound/lib/helpers';
import { bitmapTypeIds } from 'voyager-edsound/lib/constants';

import LogContext from 'contexts/Log';

import {
  processSound,
  onDecodeFinished,
  clearStage,
  saveDecodedFile,
} from 'helpers/processSound';
import fileToBuffer from 'helpers/fileToBuffer';

import InfoBar from 'components/InfoBar';
import FileInput from 'components/FileInput';
import Audio from 'components/Audio';
import VisualizerCanvas from 'components/VisualizerCanvas';
import StageCanvas from 'components/StageCanvas';
import EncodeImageStatus from 'components/EncodeImageStatus';

import MainReducer, {
  initialState,
  AUDIO_FILE_OPENED_ACTION,
  DECODING_FINISHED_ACTION,
  DECODING_STARTED_ACTION,
  IMAGE_FILE_OPENED_ACTION,
} from './reducer';

import {
  Container,
  Content,
  Menu,
  Title,
  Description,
  Info,
  MainStage,
  StageWrapper,
  AppLogo,
} from './styles';

import logo from '../../assets/svgs/app_icon.svg';

const MIN_VISUALIZER_WIDTH = 753;

const Main = React.memo(() => {
  const [state, dispatch] = useReducer(MainReducer, initialState);
  const {
    soundFileOpen,
    soundFile,
    imageFileOpen,
    imageFile,
    fileTypeId,
    soundFileBuffer,
    bitmapHeader,
    isDecoding,
    currentSoundFileDecoded,
  } = state;

  const log = useContext(LogContext);
  const visualizerCanvasRef = useRef<HTMLCanvasElement>(null);
  const stageCanvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const soundFileInputRef = useRef<HTMLInputElement>(null);
  const imageFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onDecodeFinished(() => {
      // Update state
      dispatch({
        type: DECODING_FINISHED_ACTION,
        payload: { isDecoding: false, currentSoundFileDecoded: true },
      });
      log.setIcon('tick');
      log.setText('Decoding process completed!');
    });
  }, [log]);

  // On open sound file to be decoded to image
  const handlerOpenSoundFile = () => {
    soundFileInputRef.current?.click();
  };

  // On open image file to be encoded to sound
  const handlerOpenImageFile = () => {
    imageFileInputRef.current?.click();
  };

  // On select sound file
  const handlerOnSelectSoundFile = async () => {
    const files = soundFileInputRef.current?.files;
    let fileTypeId: number;
    let bitmapHeader: BitmapWavHeader | null = null;

    if (files && files.length) {
      const currentSoundFileBuffer = await fileToBuffer(files[0]);
      fileTypeId = getTypeIdFromBuffer(currentSoundFileBuffer);

      // If file has Bitmap typeId
      if (bitmapTypeIds.indexOf(fileTypeId) !== -1) {
        bitmapHeader = getBitmapHeaderInfo(currentSoundFileBuffer);
      }

      // Update state
      dispatch({
        type: AUDIO_FILE_OPENED_ACTION,
        payload: {
          fileTypeId,
          soundFileBuffer: currentSoundFileBuffer,
          bitmapHeader,
          soundFileOpen: true,
          soundFile: files[0],
          imageFileOpen: false,
          imageFile: null,
          currentSoundFileDecoded: false,
        },
      });

      // Clear stage canvas
      clearStage();

      log.setIcon('tick');
      log.setText('File opened and ready to be decoded');
    }
  };

  // On select image file
  const handlerOnSelectImageFile = () => {
    const imageFiles = imageFileInputRef.current?.files;
    if (imageFiles && imageFiles.length) {
      // Update state
      dispatch({
        type: IMAGE_FILE_OPENED_ACTION,
        payload: {
          soundFileBuffer: null,
          soundFileOpen: false,
          soundFile: null,
          imageFileOpen: true,
          imageFile: imageFiles[0],
          currentSoundFileDecoded: false,
        },
      });

      log.setIcon('tick');
      log.setText(
        'Image file opened. Select the Bits depth you want to use to encode it.'
      );
    }
  };

  const handlerPlayAndDecode = () => {
    if (
      visualizerCanvasRef.current &&
      stageCanvasRef.current &&
      audioRef.current &&
      soundFile
    ) {
      processSound(
        visualizerCanvasRef.current,
        stageCanvasRef.current,
        audioRef.current,
        soundFile
      );

      // Update state
      dispatch({
        type: DECODING_STARTED_ACTION,
        payload: { isDecoding: true },
      });
      log.setIcon('full-stacked-chart');
      log.setText('Deconding...');
    }
  };

  const handlerOnClickSaveDecodedFile = () => {
    if (soundFileBuffer != null && fileTypeId != null) {
      saveDecodedFile();

      log.setIcon('tick');
      log.setText('Done');
    }
  };

  const handlerOnTimeUpdate = (
    event: React.SyntheticEvent<HTMLAudioElement, Event> | undefined
  ) => {
    if (event != null) {
      log.setTime(
        Math.round(event.currentTarget.currentTime),
        Math.round(event.currentTarget.duration)
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
      Open a .wav file generated by this app and decode it to
      <br />
      get the image stored on its samples or open an image file you want to
      encode as sound.
    </Description>
  );

  const noFileOpenInfo = (
    <Info>
      <NonIdealState icon={icon} title={title} description={description} />
    </Info>
  );

  const fileReadContainer = (
    <MainStage>
      <StageWrapper>
        <VisualizerCanvas
          canvasRef={visualizerCanvasRef}
          width={
            bitmapHeader != null && bitmapHeader?.width >= MIN_VISUALIZER_WIDTH
              ? bitmapHeader?.width
              : MIN_VISUALIZER_WIDTH
          }
          height={100}
        />
        <StageCanvas
          canvasRef={stageCanvasRef}
          width={bitmapHeader?.width || 0}
          height={bitmapHeader?.height || 0}
        />
      </StageWrapper>
    </MainStage>
  );

  return (
    <>
      <Container>
        <Content>
          <Menu>
            <Navbar className="bp3-dark">
              <Navbar.Group align={Alignment.LEFT}>
                <AppLogo src={logo} width={34} />
                <Navbar.Heading>Digital Voyager Image Sound</Navbar.Heading>
                <Navbar.Divider />
                {!isDecoding ? (
                  <>
                    <Button
                      className="bp3-minimal"
                      icon="document"
                      text="Decode Sound File"
                      onClick={handlerOpenSoundFile}
                    />
                    <Navbar.Divider />
                    <Button
                      className="bp3-minimal"
                      icon="document"
                      text="Encode Image File"
                      onClick={handlerOpenImageFile}
                    />
                  </>
                ) : null}
              </Navbar.Group>
              <Navbar.Group align={Alignment.RIGHT}>
                {soundFileOpen && !isDecoding ? (
                  <Button
                    className="bp3-minimal"
                    icon="full-stacked-chart"
                    text="Play and Decode"
                    onClick={handlerPlayAndDecode}
                  />
                ) : null}
                {soundFileOpen && !isDecoding && currentSoundFileDecoded ? (
                  <Button
                    className="bp3-minimal"
                    icon="archive"
                    text="Save Decoded File"
                    onClick={handlerOnClickSaveDecodedFile}
                  />
                ) : null}
              </Navbar.Group>
            </Navbar>
          </Menu>
          {soundFileOpen && !imageFileOpen ? fileReadContainer : null}
          {imageFileOpen && !soundFileOpen && imageFile ? (
            <EncodeImageStatus file={imageFile} />
          ) : null}
          {!imageFileOpen && !soundFileBuffer && !imageFile
            ? noFileOpenInfo
            : null}
          <FileInput
            ref={soundFileInputRef}
            accept=".wav"
            onChange={handlerOnSelectSoundFile}
          />
          <FileInput
            ref={imageFileInputRef}
            accept="image/*"
            onChange={handlerOnSelectImageFile}
          />
          <Audio audioRef={audioRef} onTimeUpdate={handlerOnTimeUpdate} />
        </Content>
        <InfoBar />
      </Container>
    </>
  );
});

export default Main;
