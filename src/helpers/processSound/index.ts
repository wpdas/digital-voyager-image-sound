import { bitmapTypeIds } from 'digital-voyager-image-sound-core/lib/constants';
import {
  getLoaderByTypeId,
  Loader,
  writeBitmapLoaderHeader,
} from 'digital-voyager-image-sound-core/lib/helpers';
import getBytesFromBuffer from 'digital-voyager-image-sound-core/lib/core/getBytesFromBuffer';
import saveFile, { BMP_CONTENT_TYPE } from '../saveFile';
import {
  MIN_STAGE_WIDTH,
  MIN_STAGE_HEIGHT,
  UNKNOWN_BITMAP_TYPE_ID,
} from '../../constants';

let handlerOnDecodeFinished = () => {};
/**
 * On decode finished handler. This method will be dispatched when the process of decoding
 * is finished.
 */
export const onDecodeFinished = (handler: () => void) => {
  handlerOnDecodeFinished = handler;
};

/**
 * Clear stage (bitmap visualizer)
 */
export const clearStage = () => {
  if (stageContext != null) {
    stageContext.clearRect(0, 0, canvasWidth, canvasHeight);
  }
};

let stageContext: CanvasRenderingContext2D;
let canvasWidth: number;
let canvasHeight: number;
let imageData: ImageData;
let data: Uint8ClampedArray;
let currentFileBytes: Uint8Array;
let currentFileSampleData: Uint8Array;

/**
 * Init the stage canvas. It must be ready to render bitmap info extracted from audio
 * @param stageCanvas
 */
function initStageProcess(stageCanvas: HTMLCanvasElement) {
  stageContext = stageCanvas.getContext('2d') || new CanvasRenderingContext2D();
  canvasWidth = stageCanvas.width;
  canvasHeight = stageCanvas.height;

  stageContext.clearRect(0, 0, canvasWidth, canvasHeight);
  imageData = stageContext.getImageData(0, 0, canvasWidth, canvasHeight);
  data = imageData.data;
}

let previousAnimationId: number;
/**
 * Init audio process canvas. Must be called after initStageProcess.
 * @param visualizerCanvas
 * @param audio
 */
function initAudioProcess(
  visualizerCanvas: HTMLCanvasElement,
  audio: HTMLAudioElement
) {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const WIDTH = visualizerCanvas.width;
  const HEIGHT = visualizerCanvas.height;
  const visualizerContext =
    visualizerCanvas.getContext('2d') || new CanvasRenderingContext2D();

  if (previousAnimationId != null) {
    cancelAnimationFrame(previousAnimationId);
  }

  function renderFrame() {
    previousAnimationId = requestAnimationFrame(renderFrame);

    analyser.getByteTimeDomainData(dataArray);
    draw(audio.currentTime, audio.duration);

    visualizerContext.fillStyle = '#000';
    visualizerContext.fillRect(0, 0, WIDTH, HEIGHT);
    visualizerContext.lineWidth = 1.4;
    visualizerContext.strokeStyle = 'rgb(255, 255, 255)';
    visualizerContext.beginPath();

    let sliceWidth = (WIDTH * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      let v = dataArray[i] / 128.0;
      let y = (v * HEIGHT) / 2;

      if (i === 0) {
        visualizerContext.moveTo(x, y);
      } else {
        visualizerContext.lineTo(x, y);
      }

      x += sliceWidth;
    }

    visualizerContext.lineTo(
      visualizerCanvas.width,
      visualizerCanvas.height / 2
    );
    visualizerContext.stroke();
  }

  audio.play();
  renderFrame();
}

let diff = 0;
/**
 * Draw the visualizer according to the sound samples
 * @param currentTime
 * @param duration
 */
function draw(currentTime: number, duration: number) {
  if (currentFileSampleData != null) {
    const percPlayed = (100 * currentTime) / duration;
    const readBytes = Math.ceil(
      (percPlayed * currentFileSampleData.length) / 100
    );
    const finalAdd = readBytes - diff;
    diff = readBytes;

    if (!isNaN(finalAdd)) {
      if (loader != null && loader.decodeChunk != null) {
        loader.decodeChunk({
          totalSamplesSize: currentFileSampleData.length,
          data,
          imageData: currentFileSampleData,
          bytesChunk: finalAdd,
        });
      }

      stageContext.putImageData(imageData, 0, 0);
    }
  }
}

const fileReader = new FileReader();
let loader: Loader;
let processInitialized = false;
let audioContext: AudioContext;
let source: MediaElementAudioSourceNode;
let analyser: AnalyserNode;
/**
 * Init the audio decoding process and render visualizer and data according to typeId
 * @param visualizerCanvas
 * @param stageCanvas
 * @param audio
 * @param file
 * @param typeId
 */
export const processSound = async (
  visualizerCanvas: HTMLCanvasElement,
  stageCanvas: HTMLCanvasElement,
  audio: HTMLAudioElement,
  file: File
) => {
  if (!processInitialized) {
    processInitialized = true;

    audioContext = new AudioContext();
    source = audioContext.createMediaElementSource(audio);

    // Analyser
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 4096 / 2;

    // Events
    audio.onended = () => {
      handlerOnDecodeFinished();
      setTimeout(() => {
        cancelAnimationFrame(previousAnimationId);
        previousAnimationId = NaN;
      }, 200);
    };

    fileReader.onload = () => {
      // Load file bytes (without wav header)
      currentFileBytes = getBytesFromBuffer(
        Buffer.from(fileReader.result as ArrayBuffer)
      );
      // Get typeId.
      const fileTypeId = currentFileBytes[0];

      if (bitmapTypeIds.indexOf(fileTypeId) !== -1) {
        // Initialize the recomended Loader to decode audio data
        loader = getLoaderByTypeId(fileTypeId);
        if (loader != null) {
          // Set data (extracted from samples). This will return only samples without wav header and loader header
          currentFileSampleData = loader.getSampleData(currentFileBytes);
        }
      } else {
        // Force Bitmap 8 bpp when it's a unknown audio file
        loader = getLoaderByTypeId(UNKNOWN_BITMAP_TYPE_ID);
        if (loader != null) {
          const unknownAudioBytesWithHeader = writeBitmapLoaderHeader(
            currentFileBytes,
            UNKNOWN_BITMAP_TYPE_ID,
            MIN_STAGE_WIDTH,
            MIN_STAGE_HEIGHT
          );
          currentFileSampleData = loader.getSampleData(
            unknownAudioBytesWithHeader
          );
        }
      }

      // Stage Process
      initStageProcess(stageCanvas);
      // Audio Process
      initAudioProcess(visualizerCanvas, audio);
    };
  }
  fileReader.readAsArrayBuffer(file);

  // Set audio source
  audio.src = URL.createObjectURL(file);
};

/**
 * Open dialog for save decoded file
 */
export const saveDecodedFile = async () => {
  // If the content is bitmap
  if (
    loader != null &&
    bitmapTypeIds.indexOf(loader.header.getHeaderTypeId()) !== -1
  ) {
    saveFile(
      loader.decode(currentFileBytes) as Buffer,
      'image',
      BMP_CONTENT_TYPE
    );
  }
};
