import { tensor3d } from "@tensorflow/tfjs-core";

/**
 * Convert the jpeg buffer to tensor with offset
 *
 * @param data the data array.
 * @param shape a number array with the shape of [height, width, channels].
 * @returns tf.Tensor3D
 */
export const convertBuffer = (data, shape) => {
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
