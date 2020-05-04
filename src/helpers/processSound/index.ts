import { getTypeIdFromBuffer } from 'voyager-edsound/lib/helpers';
import { loadersTypeId } from 'voyager-edsound/lib/constants';

const fileReader = new FileReader();
let previousAnimationId: number;
let processInitialized = false;

let audioContext: AudioContext;
let source: MediaElementAudioSourceNode;
let analyser: AnalyserNode;

function audioProcess(
  visualizerCanvas: HTMLCanvasElement,
  audio: HTMLAudioElement
) {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  console.log('DATA-ARRAY:', dataArray);

  const WIDTH = visualizerCanvas.width;
  const HEIGHT = visualizerCanvas.height;
  const visualizerContext =
    visualizerCanvas.getContext('2d') || new CanvasRenderingContext2D();
  console.log('WIDTH: ', WIDTH, 'HEIGHT: ', HEIGHT);

  const barWidth = (WIDTH / bufferLength) * 13;
  console.log('BARWIDTH: ', barWidth);

  console.log('TOTAL WIDTH: ', 117 * 10 + 118 * barWidth); // (total space between bars)+(total width of all bars)

  // let barHeight;
  // let x = 0;
  if (previousAnimationId != null) {
    cancelAnimationFrame(previousAnimationId);
  }

  function renderFrame() {
    previousAnimationId = requestAnimationFrame(renderFrame);

    analyser.getByteTimeDomainData(dataArray);
    // draw(Buffer.from(dataArray));
    draw(audio.currentTime, audio.duration);

    visualizerContext.fillStyle = 'rgb(0, 0, 0)';
    visualizerContext.fillRect(0, 0, WIDTH, HEIGHT);

    visualizerContext.lineWidth = 0.8;
    visualizerContext.strokeStyle = 'rgb(255, 255, 255)';

    visualizerContext.beginPath();

    var sliceWidth = (WIDTH * 1.0) / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
      var v = dataArray[i] / 128.0;
      var y = (v * HEIGHT) / 2;

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

let foo: Buffer;

let stageContext: CanvasRenderingContext2D;
let canvasWidth: number;
let canvasHeight: number;
let imageData: ImageData;
let data: Uint8ClampedArray;

function stageProcess(stageCanvas: HTMLCanvasElement) {
  stageContext = stageCanvas.getContext('2d') || new CanvasRenderingContext2D();

  canvasWidth = stageCanvas.width;
  canvasHeight = stageCanvas.height;

  h = 0;
  stageContext.clearRect(0, 0, canvasWidth, canvasHeight);

  imageData = stageContext.getImageData(0, 0, canvasWidth, canvasHeight);
  data = imageData.data;

  // setTimeout(() => {
  //   for (var i = 1; i < foo.length; i++) {
  //     data[i * 4] = foo.readUInt8(i);
  //     data[i * 4 + 1] = foo.readUInt8(i);
  //     data[i * 4 + 2] = foo.readUInt8(i);
  //     data[i * 4 + 3] = 255;
  //   }

  //   stageContext.putImageData(imageData, 0, 0);
  // }, 1000);
}

let h = 0;
let diff = 0;

function draw(currentTime: number, duration: number) {
  if (foo != null) {
    const percPlayed = (100 * currentTime) / duration;
    const readBytes = Math.ceil((percPlayed * foo.length) / 100);
    const finalAdd = readBytes - diff;
    diff = readBytes;
    // console.log(
    //   'Perc played:',
    //   percPlayed,
    //   'Read bytes:',
    //   readBytes,
    //   foo.length,
    //   finalAdd
    // );

    if (!isNaN(finalAdd)) {
      // for (let i = 0; i < readBytes; i++) {
      //   data[i * 4] = foo.readUInt8(i);
      //   data[i * 4 + 1] = foo.readUInt8(i);
      //   data[i * 4 + 2] = foo.readUInt8(i);
      //   data[i * 4 + 3] = 255;
      //   h++;
      // }

      // Metodo mais leve (Bitmap 8 bits)
      for (let i = 0; i < finalAdd; i++) {
        data[h * 4] = foo.readUInt8(h);
        data[h * 4 + 1] = foo.readUInt8(h);
        data[h * 4 + 2] = foo.readUInt8(h);
        data[h * 4 + 3] = 255;
        h++;
      }

      stageContext.putImageData(imageData, 0, 0);
    }
  }

  // if (byteArray.readUInt8(i) != 0)
  // if (foo != null) {
  //   for (let i = 0; i < 22050; i++) {
  //     data[h * 4 + read] = foo.readUInt8(h);
  //     data[h * 4 + 1 + read] = foo.readUInt8(h);
  //     data[h * 4 + 2 + read] = foo.readUInt8(h);
  //     data[h * 4 + 3 + read] = 255;
  //     h++;
  //   }

  //   // read += byteArray.length;
  //   read += 22050;

  //   stageContext.putImageData(imageData, 0, 0);
  // }
}

const processSound = async (
  visualizerCanvas: HTMLCanvasElement,
  stageCanvas: HTMLCanvasElement,
  audio: HTMLAudioElement,
  file: File
) => {
  audio.src = URL.createObjectURL(file);
  console.log(stageCanvas);

  if (!processInitialized) {
    processInitialized = true;

    fileReader.onload = () => {
      const arrayBuffer = fileReader.result as ArrayBuffer;

      foo = Buffer.from(arrayBuffer);
      const sampleDataBuffer: Buffer = Buffer.alloc(foo.length);
      foo.copy(sampleDataBuffer, 0, 49);

      const typeId = getTypeIdFromBuffer(Buffer.from(arrayBuffer));
      console.log(typeId, typeId === loadersTypeId.BITMAP_1BIT_PP);
    };

    audioContext = new AudioContext();
    source = audioContext.createMediaElementSource(audio);

    // Analyser
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 4096;

    // Events
    audio.onended = () => {
      // console.log(data);
      console.log('FINAL:');
    };
  }
  fileReader.readAsArrayBuffer(file);

  // Stage Process
  stageProcess(stageCanvas);

  // Audio Process
  audioProcess(visualizerCanvas, audio);
  // console.log(visualizerCanvas, audio, audioProcess);
};

export default processSound;
