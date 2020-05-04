// Bridge Api
interface Api {
  showOpenDialog: () => void;
  // onOpenFile: (callback: (data: Buffer | null) => void) => void;
  onOpenFile: (
    callback: (data: { fileDir: string; fileData: Buffer | null }) => void
  ) => void;
  // mainWindow.webContents.send(ON_OPEN_FILE, { fileDir, fileData });
}

interface Window {
  api: Api;
}
