import { BitmapWavHeader } from 'voyager-edsound/lib/helpers';

export const RESET_ACTION = 'RESET_ACTION';
export const AUDIO_FILE_OPENED_ACTION = 'AUDIO_FILE_OPENED_ACTION';
export const IMAGE_FILE_OPENED_ACTION = 'IMAGE_FILE_OPENED_ACTION';
export const DECODING_STARTED_ACTION = 'DECODING_STARTED_ACTION';
export const DECODING_FINISHED_ACTION = 'DECODING_FINISHED';

type ActionTypes =
  | typeof RESET_ACTION
  | typeof AUDIO_FILE_OPENED_ACTION
  | typeof IMAGE_FILE_OPENED_ACTION
  | typeof DECODING_STARTED_ACTION
  | typeof DECODING_FINISHED_ACTION;

interface State {
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

export const initialState: State = {
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

interface Action {
  type: ActionTypes;
  payload: State;
}

const MainReducer = (state: State, action: Action) => {
  switch (action.type) {
    case RESET_ACTION:
      return {
        ...state,
        ...action.payload,
      } as State;
    case AUDIO_FILE_OPENED_ACTION:
      return {
        ...state,
        ...action.payload,
      } as State;
    case IMAGE_FILE_OPENED_ACTION:
      return {
        ...state,
        ...action.payload,
      } as State;
    case DECODING_STARTED_ACTION:
      return {
        ...state,
        ...action.payload,
      } as State;
    case DECODING_FINISHED_ACTION:
      return {
        ...state,
        ...action.payload,
      } as State;
    default:
      return state;
  }
};

export default MainReducer;
