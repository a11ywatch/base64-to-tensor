import { tensor3d } from "@tensorflow/tfjs-core";
import { decode } from "jpeg-js";

/**
 * Convert the jpeg buffer to tensor with offset
 *
 * @param data the data array.
 * @param shape a number array with the shape of [height, width, channels].
 * @returns tf.Tensor3D
 */
const convertBuffer = (data, shape) => {
  const [height, width, channels] = shape;
  const buffer = new Uint8Array(width * height * 3);

  let offset = 0;

  for (let i = 0; i < buffer.length; i += 3) {
    buffer[i] = data[offset];
    buffer[i + 1] = data[offset + 1];
    buffer[i + 2] = data[offset + 2];

    offset += 4;
  }
  return tensor3d(buffer, [height, width, channels]);
};

/**
 * Decode a Uint8Array into Tensor3d
 *
 * @param contents a valid Uint8Array.
 * @returns tf.Tensor3D
 */
export const decodeImage = (contents: Uint8Array, channels: 0 | 1 | 3 = 3) => {
  const { data, width, height } = decode(contents, { useTArray: true });

  return convertBuffer(data, [height, width, channels]);
};

let _sharp;

/**
 * Decode a Uint8Array into Tensor3d
 *
 * @param contents a valid Uint8Array.
 * @param sharp optional use native sharp lib to process the image.
 * @returns tf.Tensor3D
 */
export const decodeImageAsync = async (
  contents: Uint8Array,
  channels: 0 | 1 | 3 = 3
) => {
  // load sharp
  if (!_sharp) {
    _sharp = require("sharp");
  }

  const { err, data, info } = await _sharp(Buffer.from(contents))
    .jpeg()
    .toBuffer({ resolveWithObject: true });

  if (err) {
    return null;
  }

  const { width, height } = info;

  return convertBuffer(data.buffer, [height, width, channels]);
};
