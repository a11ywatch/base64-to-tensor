import { convertBuffer } from "./decode";
import { toTypedArray } from "./typed-array";

/**
 * This operation converts a base64 into a Tensor3D.
 *
 * @param base64 a valid base64 encoded string.
 * @returns tf.Tensor3D
 */
export const convertAsync = async (base64: string) => {
  if (!base64) {
    return null;
  }
  const typedArray = toTypedArray(base64);

  return await decodeImageAsync(typedArray);
};

/**
 * Decode a Uint8Array into Tensor3d
 *
 * @param contents a valid Uint8Array.
 * @returns tf.Tensor3D
 */
export const decodeImageAsync = async (contents: Uint8Array) => {
  const sharp = await import("sharp");

  const { data, info } = await sharp
    .default(Buffer.from(contents), { unlimited: true })
    .toFormat("jpeg", { mozjpeg: true })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixelArray = new Uint8Array(data);

  return convertBuffer(pixelArray, [info.height, info.width, 3]);
};
