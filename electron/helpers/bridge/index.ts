/**
 * Must be used by Electron side only
 * This is used for create a bridge between the client and node core
 */

import { ipcMain, dialog } from 'electron';

// import { helpers } from 'voyager-edsound';

// const { getLoaderByTypeId } = helpers;
// const { getBytesFromBuffer } = core;

// const getLoaderByTypeId = require('voyager-edsound/lib/helpers/getLoaderByTypeId');
// console.log(getLoaderByTypeId);

const { promises } = require('fs');

// Channels
export const SHOW_OPEN_DIALOG = 'SHOW_OPEN_DIALOG';
export const ON_OPEN_FILE = 'ON_OPEN_FILE';

export const DECODE_AND_SAVE_FILE = 'DECODE_AND_SAVE_FILE';
export const ON_DECODE_AND_SAVE_FILE_COMPLETED =
  'ON_DECODE_AND_SAVE_FILE_COMPLETED';

// Methods names (used by preload)
export const showOpenDialog = 'showOpenDialog';
export const onOpenFile = 'onOpenFile';

export const decodeAndSaveFile = 'decodeAndSaveFile';
export const onDecodeAndSaveFileCompleted = 'onDecodeAndSaveFileCompleted';

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
      // mainWindow.webContents.send(ON_OPEN_FILE, fileData);
      mainWindow.webContents.send(ON_OPEN_FILE, { fileDir, fileData });
    } catch (err) {
      mainWindow.webContents.send(ON_OPEN_FILE, null);
    }
  });
};

const setupDecodeAndSaveFileApi = () => {
  ipcMain.on(
    DECODE_AND_SAVE_FILE,
    (_, audioBuffer: Buffer, loaderTypeId: number) => {
      console.log(audioBuffer, loaderTypeId);
      // console.log(audioBuffer, loaderTypeId);
      // const loader = getLoaderByTypeId(loaderTypeId);
      // const uint8ArrayBuffer: Uint8Array = await getBytesFromBuffer(
      //   audioBuffer
      // );

      // if (loader != null) {
      //   const decodedBuffer = loader.decode(uint8ArrayBuffer);

      //   const { filePath } = await dialog.showSaveDialog(
      //     mainWindow as Electron.BrowserWindow,
      //     {
      //       title: 'Decoded file',
      //       filters: [{ name: 'Bitmap', extensions: ['bmp'] }],
      //     }
      //   );

      //   console.log(decodedBuffer, filePath);

      //   mainWindow.webContents.send(ON_DECODE_AND_SAVE_FILE_COMPLETED);
      // }
    }
  );
};

/**
 * Init Bridge API connector. This will turn possible to use Node resources safely
 * @param currentWindow
 */
const initBridge = (currentWindow: Electron.BrowserWindow) => {
  mainWindow = currentWindow;

  // Setup open file api
  setupOpenFileApi();
  // Setup decode and save file api
  setupDecodeAndSaveFileApi();
};

export default initBridge;
