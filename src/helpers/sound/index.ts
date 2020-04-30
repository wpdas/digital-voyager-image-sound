const SAMPLE_RATE = 44100;

let audioDataBuffer: Float32Array;

const setAudioBuffer = async (buffer: Buffer) => {
  // ---------- Modo lendo os bytes do sampleRates direto com Uint8Array (retorna decimal) ---------
  // Não está sendo lido a informação de quantos canais, etc. Para saber disso, deve-se ler
  // o ponteiro certo na HEADER do arquivo WAV. Aqui esta sendo usado o modo default
  // do programa que é 1 canal com um sample rate de 44100
  const decimalSampleData: Uint8Array = Uint8Array.from(buffer.slice(44)); // WAV header tem 44 bytes
  // basta agora converter os valores de `decimalSampleData` para binario no Reader do programa.

  // Se for necessário reproduzir o conteúdo, deve converter os valores para Float32Array que vai definir
  // o comprimento do sampleRate (modelo usado para audio):
  const floatSampleData: Float32Array = new Float32Array(
    decimalSampleData.length
  );
  decimalSampleData.forEach((uint8Value, index) => {
    floatSampleData[index] = (uint8Value - 128) / 128.0;
  });

  console.log('A', decimalSampleData);
  console.log('B', floatSampleData);
  audioDataBuffer = floatSampleData;

  // let audioBits = '';
  // for (let i = 0; i < audioDataBuffer.length; i++) {
  //   const byte = audioDataBuffer[i];
  //   const byteFixSamplePosition = byte + 1;
  //   const decimalNumber = Math.round(byteFixSamplePosition / SAMPLE_BYTE);
  //   audioBits += decimalToBinary(decimalNumber, 8);
  // }
};

let audioCtx: AudioContext;

const startProcess = () => {
  audioCtx = new AudioContext({ sampleRate: 44100 });

  // Create an empty three-second stereo buffer at the sample rate of the AudioContext
  const myArrayBuffer = audioCtx.createBuffer(
    1,
    audioDataBuffer.length,
    SAMPLE_RATE
  );

  // Fill the buffer with white noise;
  //just random values between -1.0 and 1.0
  for (var channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
    // This gives us the actual ArrayBuffer that contains the data
    var nowBuffering = myArrayBuffer.getChannelData(channel);
    for (var i = 0; i < myArrayBuffer.length; i++) {
      // Math.random() is in [0; 1.0]
      // audio needs to be in [-1.0; 1.0]
      nowBuffering[i] = audioDataBuffer[i];
    }
  }

  // Get an AudioBufferSourceNode.
  // This is the AudioNode to use when we want to play an AudioBuffer
  const source = audioCtx.createBufferSource();
  // set the buffer in the AudioBufferSourceNode
  source.buffer = myArrayBuffer;
  // connect the AudioBufferSourceNode to the
  // destination so we can hear the sound
  source.connect(audioCtx.destination);
  source.onended = () => {
    console.log('Ended');
  };
  // start the source playing
  source.start();
};

export { setAudioBuffer, startProcess };
