import { BitmapWavHeader } from 'voyager-edsound/lib/helpers';

export const AUDIO_FILE_OPENED_ACTION = 'AUDIO_FILE_OPENED_ACTION';
export const IMAGE_FILE_OPENED_ACTION = 'IMAGE_FILE_OPENED_ACTION';
export const DECODING_STARTED_ACTION = 'DECODING_STARTED_ACTION';
export const DECODING_FINISHED_ACTION = 'DECODING_FINISHED';

type ActionTypes =
  | typeof AUDIO_FILE_OPENED_ACTION
  | typeof IMAGE_FILE_OPENED_ACTION
  | typeof DECODING_STARTED_ACTION
  | typeof DECODING_FINISHED_ACTION;

interface State {
  imageFileOpen?: boolean;
  imageFile?: File | null;
  soundFileOpen?: boolean;
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
