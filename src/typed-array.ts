import { base64Replacer } from "./trim-base64";

/**
 * Convert base64 to TypedArray.
 *
 * @param base64 a valid base64 encoded string.
 * @returns Uint8Array
 */
export const toTypedArray = (base64: string) => {
  const bufferObject = Buffer.from(base64Replacer(base64), "base64");
  const arrayBuffer = new ArrayBuffer(bufferObject.length);
  const typedArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < bufferObject.length; ++i) {
    typedArray[i] = bufferObject[i];
  }

  return typedArray;
};
