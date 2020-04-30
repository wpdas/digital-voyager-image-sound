/**
 * Must be used by Electron side only
 * This is used for create a bridge between the client and node core
 */

import { ipcMain, dialog } from 'electron';
const { promises } = require('fs');

// Channels
export const SHOW_OPEN_DIALOG = 'SHOW_OPEN_DIALOG';
export const ON_OPEN_FILE = 'ON_OPEN_FILE';

// Methods names
export const showOpenDialog = 'showOpenDialog';
export const onOpenFile = 'onOpenFile';

let mainWindow: Electron.BrowserWindow;

const setupOpenFileApi = () => {
  ipcMain.on(SHOW_OPEN_DIALOG, async () => {
    try {
      const files = await dialog.showOpenDialog(
        mainWindow as Electron.BrowserWindow,
        {
          properties: ['openFile'],
          filters: [
            { name: 'Encoded Voyager Audio', extensions: ['wav', 'wave'] },
          ],
        }
      );

      const [fileDir] = files.filePaths;
      const fileData = await promises.readFile(fileDir);
      mainWindow.webContents.send(ON_OPEN_FILE, fileData);
    } catch (err) {
      mainWindow.webContents.send(ON_OPEN_FILE, null);
    }
  });
};

/**
 * Init Bridge API connector. This will turn possible to use Node resources safely
 * @param currentWindow
 */
const initBridge = (currentWindow: Electron.BrowserWindow) => {
  mainWindow = currentWindow;

  // Setup open file api
  setupOpenFileApi();
};

export default initBridge;
