import Jimp from 'jimp';
import bmp from 'bmp-js';

const imageToBitmap = async (imageBuffer: Buffer) => {
  const image = await Jimp.read(imageBuffer);
  return bmp.encode({
    data: image.bitmap.data,
    width: image.bitmap.width,
    height: image.bitmap.height,
  }).data;
};

export default imageToBitmap;
