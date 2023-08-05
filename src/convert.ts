import { convertBuffer } from "./decode";
import { base64Replacer } from "./trim-base64";

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

  return decodeImage(Buffer.from(base64Replacer(base64), "base64"));
};

let decode;

/**
 * Decode a Uint8Array into Tensor3d
 *
 * @param contents a valid Uint8Array.
 * @returns tf.Tensor3D
 */
export const decodeImage = (contents: Uint8Array) => {
  if(!decode) {
    decode = require("jpeg-js").decode
  }
  const { data, width, height } = decode(contents, { useTArray: true });

  return convertBuffer(data, [height, width, 3]);
};
