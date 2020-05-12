let fileReader = new FileReader();

const fileToBuffer = (file: File) => {
  return new Promise<Buffer>((resolve) => {
    fileReader.onload = () => {
      const arrayBuffer = fileReader.result as ArrayBuffer;
      resolve(Buffer.from(arrayBuffer));
    };

    fileReader.readAsArrayBuffer(file);
  });
};

export default fileToBuffer;
