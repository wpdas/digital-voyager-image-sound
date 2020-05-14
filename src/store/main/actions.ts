import { BitmapWavHeader } from 'digital-voyager-image-sound-core/lib/helpers';

import {
  RESET_ACTION,
  IMAGE_FILE_OPENED_ACTION,
  AUDIO_FILE_OPENED_ACTION,
  DECODING_STARTED_ACTION,
  DECODING_FINISHED_ACTION,
  ResetAction,
  ImageFileOpenedAction,
  AudioFileOpenedAction,
  DecodingProcessStartedAction,
  DecodingProcessFinishedAction,
} from './types';

export const reset = (): ResetAction => {
  return {
    type: RESET_ACTION,
  };
};

export const imageFileOpened = (imgeFile: File): ImageFileOpenedAction => {
  return {
    type: IMAGE_FILE_OPENED_ACTION,
    payload: imgeFile,
  };
};

export const audioFileOpened = (
  fileTypeId: number,
  soundFileBuffer: Buffer,
  bitmapHeader: BitmapWavHeader | null,
  soundFile: File
): AudioFileOpenedAction => {
  return {
    type: AUDIO_FILE_OPENED_ACTION,
    payload: {
      fileTypeId,
      soundFileBuffer,
      bitmapHeader,
      soundFile,
    },
  };
};

export const decodingProcessStarted = (): DecodingProcessStartedAction => {
  return {
    type: DECODING_STARTED_ACTION,
  };
};

export const decodingProcessFinished = (): DecodingProcessFinishedAction => {
  return {
    type: DECODING_FINISHED_ACTION,
  };
};
