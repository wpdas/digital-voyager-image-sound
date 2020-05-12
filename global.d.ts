// wav-encoder
// interface AudioData {
//   sampleRate: number;
//   channelData: Array<Float32Array>;
// }

// interface Options {
//   bitDepth?: number;
//   float?: boolean;
//   symmetric?: number;
// }

// declare module 'wav-encoder' {
//   const WavEncoder: {
//     encode: (audioData: AudioData, opts?: Options) => Promise<ArrayBuffer>;
//   };
//   export = WavEncoder;
// }

// Bridge Api
interface Api {
  // Open dialog and load file buffer
  showOpenDialog: () => void;
  onOpenFile: (
    callback: (data: { fileDir: string; fileData: Buffer | null }) => void
  ) => void;
  // Decode and save file
  decodeAndSaveFile: (audioBuffer: Buffer, loaderTypeId: number) => void;
  onDecodeAndSaveFileCompleted: (callback: () => void) => void;
}

interface Window {
  api: Api;
}
