import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';
import initBridge from './helpers/bridge';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  // Create the browser window.electron
  mainWindow = new BrowserWindow({
    width: 1116,
    height: 634,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true, // preload can only be used if contextIsolation is enabled
      preload: __dirname + '/preload.js',
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000');

  // Init Bridge API connector (allow to use node resources safely)
  initBridge(mainWindow);

  // Menu
  const template: Array<MenuItemConstructorOptions> = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open File',
          click() {
            // openFile();
            console.log('Open file!!!');
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// ipcMain.on('toTest', async (_, fileDir: string) => {
//   console.log('Electron toTest', fileDir);

//   const fileData = await remoteOpenFile();

//   // fs.readFile(fileDir, (_: unknown, data: Buffer) => {
//   // Do something with file contents
//   // Send result back to renderer process
//   console.log('Leu arquivo:', fileData.length);
//   mainWindow?.webContents.send('fromTest', fileData);
//   // });
// });

// const remoteOpenFile = async () => {
//   if (mainWindow == null) return;

//   const files = await dialog.showOpenDialog(
//     mainWindow as Electron.BrowserWindow,
//     {
//       properties: ['openFile'],
//       filters: [{ name: 'Encoded Voyager Audio', extensions: ['wav', 'wave'] }],
//     }
//   );

//   if (!files) return;

//   const [fileDir] = files.filePaths;
//   return await promises.readFile(fileDir);
// };

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// import { app, BrowserWindow } from 'electron';
// import * as path from 'path';

// let mainWindow: Electron.BrowserWindow | null;

// function createWindow() {
//   // Create the browser window.electron
//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       nodeIntegration: true,
//     },
//   });

//   // and load the index.html of the app.
//   mainWindow.loadFile(path.join(__dirname, 'index.html'));

//   // Open the DevTools.
//   //   mainWindow.webContents.openDevTools();

//   // Emitted when the window is closed.
//   mainWindow.on('closed', () => {
//     // Dereference the window object, usually you would store windows
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     mainWindow = null;
//   });
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', () => {
//   createWindow();
// });

// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   // On OS X it"s common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow();
//   }
// });
