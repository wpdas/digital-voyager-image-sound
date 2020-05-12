import Jimp from 'jimp';
import bmp from 'bmp-js';

const imageToBitmap = async (imageBuffer: Buffer) => {
  const image = await Jimp.read(imageBuffer);

  const QBGR: Array<number> = [];

  const imageData = image.bitmap.data;
  // Converts RGB to QBGR (way being used to voyager-edsound module)
  for (let i = 3; i < imageData.length; i += 4) {
    QBGR.push(
      imageData.readUInt8(i),
      imageData.readUInt8(i - 1),
      imageData.readUInt8(i - 2),
      imageData.readUInt8(i - 3)
    );
  }

  return bmp.encode({
    data: Buffer.from(QBGR),
    width: image.bitmap.width,
    height: image.bitmap.height,
  }).data;
};

export default imageToBitmap;
