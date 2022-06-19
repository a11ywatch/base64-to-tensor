import { decode } from "jpeg-js";
import { convertBuffer } from "./decode";
import { toTypedArray } from "./typed-array";

/**
 * This operation converts a base64 into a Tensor3D.
 *
 * @param base64 a valid base64 encoded string.
 * @returns tf.Tensor3D
 */
export const convert = (base64: string) => {
  if (!base64) {
    return null;
  }
  const typedArray = toTypedArray(base64);

  return decodeImage(typedArray);
};

/**
 * Decode a Uint8Array into Tensor3d
 *
 * @param contents a valid Uint8Array.
 * @returns tf.Tensor3D
 */
export const decodeImage = (contents: Uint8Array) => {
  const { data, width, height } = decode(contents, { useTArray: true });

  return convertBuffer(data, [height, width, 3]);
};
