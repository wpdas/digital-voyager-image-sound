import React from 'react';
import { Icon, Navbar, Button, H4 } from '@blueprintjs/core';
import { getLoaderByTypeId, Loader } from 'voyager-edsound/lib/helpers';
import { loadersTypeId } from 'voyager-edsound/lib/constants';
import writeSampleBytes from 'voyager-edsound/lib/core/writeSampleBytes';
import uint8ArrayToArray from 'helpers/uint8arrayToArray';
import imageToBitmap from 'helpers/imageToBitmap';
import saveFile, { WAV_CONTENT_TYPE } from 'helpers/saveFile';

import previewImage from '../../assets/images/image_preview.jpg';
import {
  Container,
  Paragraph,
  ImageDetailWrapper,
  ImageDetail,
  PreviewImage,
  FileStatus,
} from './styles';

interface Props {
  file: File;
}

type BitmapLoaders =
  | typeof loadersTypeId.BITMAP
  | typeof loadersTypeId.BITMAP_1BIT_PP
  | typeof loadersTypeId.BITMAP_2BITS_PP
  | typeof loadersTypeId.BITMAP_4BITS_PP
  | typeof loadersTypeId.BITMAP_8BITS_PP;

const fileReader = new FileReader();

const EncodeImageStatus: React.FC<Props> = ({ file }: Props) => {
  const handlerEncodeImage = (
    bitmapLoaderId: BitmapLoaders,
    companionFileName: string
  ) => {
    fileReader.onload = async () => {
      const fileBuffer = await imageToBitmap(
        Buffer.from(fileReader.result as ArrayBuffer)
      );

      const bitmapLoader: Loader = getLoaderByTypeId(bitmapLoaderId);

      if (bitmapLoader != null) {
        const encodedData = bitmapLoader.encode(fileBuffer as never);
        const encodedBuffer = await writeSampleBytes(
          uint8ArrayToArray(encodedData.bytes)
        );

        saveFile(
          encodedBuffer,
          `${file.name}_${companionFileName}.wav`,
          WAV_CONTENT_TYPE
        );
      }
    };
    fileReader.readAsArrayBuffer(file);
  };

  return (
    <Container>
      <FileStatus>
        <Icon icon="media" iconSize={24} color="rgba(167,182,194,.6)" />
        <H4 style={{ color: '#f5f8fa', marginLeft: 16 }}>{file.name}</H4>
      </FileStatus>
      <Paragraph>
        <Icon icon="label" iconSize={14} color="#f5f8fa" /> {` `} Bpp means bits
        per pixel
      </Paragraph>
      <Paragraph>
        Below you can see an example of how the image will look like after be
        decoded. Fewer bits means less file size but this impact directly to the
        way the colours will be stored and read.
      </Paragraph>
      <Paragraph>
        Click over Encode button according to the preferences you want:
      </Paragraph>
      <ImageDetailWrapper>
        <ImageDetail>1 Bpp</ImageDetail>
        <ImageDetail>2 Bpp</ImageDetail>
        <ImageDetail>4 Bpp</ImageDetail>
        <ImageDetail>8 Bpp</ImageDetail>
        <ImageDetail>24 Bpp (RGB color)</ImageDetail>
      </ImageDetailWrapper>
      <PreviewImage src={previewImage} />
      <Navbar className="bp3-dark">
        <Navbar.Group
          style={{ float: 'none', justifyContent: 'space-between' }}
        >
          <Button
            className="bp3-minimal"
            icon="document"
            text="Encode 1 Bpp"
            onClick={() => {
              handlerEncodeImage(loadersTypeId.BITMAP_1BIT_PP, '1bpp');
            }}
          />
          <Navbar.Divider />
          <Button
            className="bp3-minimal"
            icon="document"
            text="Encode 2 Bpp"
            onClick={() => {
              handlerEncodeImage(loadersTypeId.BITMAP_2BITS_PP, '2bpp');
            }}
          />
          <Navbar.Divider />
          <Button
            className="bp3-minimal"
            icon="document"
            text="Encode 4 Bpp"
            onClick={() => {
              handlerEncodeImage(loadersTypeId.BITMAP_4BITS_PP, '4bpp');
            }}
          />
          <Navbar.Divider />
          <Button
            className="bp3-minimal"
            icon="document"
            text="Encode 8 Bpp"
            onClick={() => {
              handlerEncodeImage(loadersTypeId.BITMAP_8BITS_PP, '8bpp');
            }}
          />
          <Navbar.Divider />
          <Button
            className="bp3-minimal"
            icon="document"
            text="Encode 24 Bpp"
            onClick={() => {
              handlerEncodeImage(loadersTypeId.BITMAP, '24bppRGBColor');
            }}
          />
        </Navbar.Group>
      </Navbar>
    </Container>
  );
};

export default EncodeImageStatus;
