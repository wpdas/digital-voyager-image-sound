// Bridge Api
interface Api {
  showOpenDialog: () => void;
  onOpenFile: (callback: (data: Buffer | null) => void) => void;
}

interface Window {
  api: Api;
}
