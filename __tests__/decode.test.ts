import "@tensorflow/tfjs-backend-wasm";
import { ready, setBackend } from "@tensorflow/tfjs-core";
import data from "../__mocks__/buffer.json";
import { decodeImage } from "../src/convert";

describe("decode jpeg data", () => {
  test("Decodes a Uint8Array to Tensor3d", async () => {
    await setBackend("wasm"); // set tensorflow wasm backend
    await ready();

    const tensor = decodeImage(new Uint8Array(data));

    expect(tensor).toEqual({
      kept: false,
      isDisposedInternal: false,
      shape: [189, 300, 3],
      dtype: "int32",
      size: 170100,
      strides: [900, 3],
      dataId: { id: 1 },
      id: 0,
      rankType: "3",
    });
  });
});
