import { BitmapWavHeader } from 'digital-voyager-image-sound-core/lib/helpers';

// Actions Types
export const RESET_ACTION = 'RESET_ACTION';
export const AUDIO_FILE_OPENED_ACTION = 'AUDIO_FILE_OPENED_ACTION';
export const IMAGE_FILE_OPENED_ACTION = 'IMAGE_FILE_OPENED_ACTION';
export const DECODING_STARTED_ACTION = 'DECODING_STARTED_ACTION';
export const DECODING_FINISHED_ACTION = 'DECODING_FINISHED_ACTION';

export type ActionTypes =
  | typeof RESET_ACTION
  | typeof AUDIO_FILE_OPENED_ACTION
  | typeof IMAGE_FILE_OPENED_ACTION
  | typeof DECODING_STARTED_ACTION
  | typeof DECODING_FINISHED_ACTION;

// Action Method Types
export interface ResetAction {
  readonly type: typeof RESET_ACTION;
}

export interface ImageFileOpenedAction {
  readonly type: typeof IMAGE_FILE_OPENED_ACTION;
  readonly payload: File;
}

export type AudioFileOpenedProps = {
  fileTypeId: number;
  soundFileBuffer: Buffer;
  bitmapHeader: BitmapWavHeader | null;
  soundFile: File;
};

export interface AudioFileOpenedAction {
  readonly type: typeof AUDIO_FILE_OPENED_ACTION;
  readonly payload: AudioFileOpenedProps;
}

export interface DecodingProcessStartedAction {
  readonly type: typeof DECODING_STARTED_ACTION;
}

export interface DecodingProcessFinishedAction {
  readonly type: typeof DECODING_FINISHED_ACTION;
}

type MainReducerActionTypes =
  | ResetAction
  | ImageFileOpenedAction
  | AudioFileOpenedAction
  | DecodingProcessStartedAction
  | DecodingProcessFinishedAction;

// State
export interface MainState {
  imageFileOpen?: boolean;
  imageFile?: File | null;
  soundFileOpen?: boolean;
  soundFile?: File | null;
  fileTypeId?: number;
  soundFileBuffer?: Buffer | null;
  bitmapHeader?: BitmapWavHeader | null;
  isDecoding?: boolean;
  currentSoundFileDecoded?: boolean;
}

export type MainReducer = (
  state: MainState,
  action: MainReducerActionTypes
) => MainState;
