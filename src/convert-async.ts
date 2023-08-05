import { convertBuffer } from "./decode";
import { base64Replacer } from "./trim-base64";

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
  return await decodeImageAsync(Buffer.from(base64Replacer(base64), "base64"));
};

let sharp;

/**
 * Decode a Uint8Array into Tensor3d
 *
 * @param contents a valid Uint8Array.
 * @returns tf.Tensor3D
 */
export const decodeImageAsync = async (contents: Uint8Array) => {
  if(!sharp) {
    sharp = (await import("sharp")).default;
  }

  const { data, info } = await sharp(contents, { unlimited: true })
    .toFormat("jpeg", { mozjpeg: true, quality: 100, chromaSubsampling: '4:4:4'  })
    .raw()
    .unflatten()
    .toBuffer({ resolveWithObject: true });

  const pixelArray = new Uint8Array(data);

  return convertBuffer(pixelArray, [info.height, info.width, 3]);
};
