import {
  MainState,
  MainReducer,
  AudioFileOpenedProps,
  RESET_ACTION,
  AUDIO_FILE_OPENED_ACTION,
  IMAGE_FILE_OPENED_ACTION,
  DECODING_STARTED_ACTION,
  DECODING_FINISHED_ACTION,
} from './types';

export const initialState: MainState = {
  imageFileOpen: false,
  imageFile: null,
  soundFileOpen: false,
  soundFile: null,
  fileTypeId: NaN,
  soundFileBuffer: null,
  bitmapHeader: null,
  isDecoding: false,
  currentSoundFileDecoded: false,
};

const resetCase = (state: MainState): MainState => {
  return {
    ...state,
    soundFileOpen: false,
    imageFileOpen: false,
    imageFile: null,
    currentSoundFileDecoded: false,
  };
};

const audioFileOpenedCase = (state: MainState, props: AudioFileOpenedProps) => {
  const { fileTypeId, soundFileBuffer, bitmapHeader, soundFile } = props;
  return {
    ...state,
    fileTypeId,
    soundFileBuffer,
    bitmapHeader,
    soundFileOpen: true,
    soundFile,
    imageFileOpen: false,
    imageFile: null,
    currentSoundFileDecoded: false,
  };
};

const imageFileOpenedCase = (
  state: MainState,
  imageFile: File | null | undefined
): MainState => {
  return {
    ...state,
    soundFileBuffer: null,
    soundFileOpen: false,
    soundFile: null,
    imageFileOpen: true,
    imageFile,
    currentSoundFileDecoded: false,
  };
};

const decodingProcessStartedCase = (state: MainState): MainState => {
  return {
    ...state,
    isDecoding: true,
  };
};

const decodingProcessFinishedCase = (state: MainState): MainState => {
  return {
    ...state,
    isDecoding: false,
    currentSoundFileDecoded: true,
  };
};

const mainReducer: MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ACTION:
      return resetCase(state);
    case AUDIO_FILE_OPENED_ACTION:
      return audioFileOpenedCase(state, action.payload);
    case IMAGE_FILE_OPENED_ACTION:
      return imageFileOpenedCase(state, action.payload);
    case DECODING_STARTED_ACTION:
      return decodingProcessStartedCase(state);
    case DECODING_FINISHED_ACTION:
      return decodingProcessFinishedCase(state);
    default:
      return state;
  }
};

export default mainReducer;
