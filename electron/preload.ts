import { contextBridge, ipcRenderer } from 'electron';
import {
  showOpenDialog,
  SHOW_OPEN_DIALOG,
  onOpenFile,
  ON_OPEN_FILE,
  decodeAndSaveFile,
  DECODE_AND_SAVE_FILE,
  onDecodeAndSaveFileCompleted,
  ON_DECODE_AND_SAVE_FILE_COMPLETED,
} from './helpers/bridge';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  // Open dialog and load file buffer
  [showOpenDialog]: () => {
    ipcRenderer.send(SHOW_OPEN_DIALOG);
  },
  [onOpenFile]: (callback: (buffer: Buffer | null) => void) => {
    ipcRenderer.on(ON_OPEN_FILE, (_, data) => callback(data));
  },
  // Decode and save file
  [decodeAndSaveFile]: (audioBuffer: Buffer, loaderTypeId: number) => {
    ipcRenderer.send(DECODE_AND_SAVE_FILE, [audioBuffer, loaderTypeId]);
  },
  [onDecodeAndSaveFileCompleted]: (callback: () => void) => {
    ipcRenderer.on(ON_DECODE_AND_SAVE_FILE_COMPLETED, () => callback());
  },
});
