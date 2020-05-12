export const BMP_CONTENT_TYPE = 'image/bmp';
export const WAV_CONTENT_TYPE = 'audio/wav';
export const TEXT_CONTENT_TYPE = 'text/plain';
export const DECIMAL_CONTENT_TYPE = TEXT_CONTENT_TYPE;

type ContentTypes =
  | typeof BMP_CONTENT_TYPE
  | typeof WAV_CONTENT_TYPE
  | typeof TEXT_CONTENT_TYPE
  | typeof DECIMAL_CONTENT_TYPE;

const saveFile = (
  buffer: Buffer,
  filename: string,
  contentType: ContentTypes
) => {
  const a = document.createElement('a');
  const blob = new Blob(
    [new Uint8Array(buffer, buffer.byteOffset, buffer.length)],
    { type: contentType }
  );
  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  a.click();
};

export default saveFile;
