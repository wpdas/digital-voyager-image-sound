import { contextBridge, ipcRenderer } from 'electron';
import {
  showOpenDialog,
  SHOW_OPEN_DIALOG,
  onOpenFile,
  ON_OPEN_FILE,
} from './helpers/bridge';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  [showOpenDialog]: () => {
    ipcRenderer.send(SHOW_OPEN_DIALOG);
  },
  [onOpenFile]: (callback: (buffer: Buffer | null) => void) => {
    ipcRenderer.on(ON_OPEN_FILE, (_, data) => callback(data));
  },
});
