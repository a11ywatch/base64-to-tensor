import "@tensorflow/tfjs-backend-wasm";
import { convert } from "../src/convert";
import { convertAsync } from "../src/convert-async";
import { SAMPLE } from "../__mocks__/sample";
import { ready, setBackend } from "@tensorflow/tfjs-core";

beforeAll(async () => {
  await setBackend("wasm"); // set tensorflow wasm backend
  await ready();
});

describe("convert base64 to tensor", () => {
  test("use pure js", async () => {
    const tensor = convert(SAMPLE);

    expect(tensor).toEqual({
      kept: false,
      isDisposedInternal: false,
      shape: [113, 150, 3],
      dtype: "int32",
      size: 50850,
      strides: [450, 3],
      dataId: { id: 1 },
      id: 0,
      rankType: "3",
    });

    tensor?.dispose();
  });

  test("use sharp", async () => {
    const tensor = await convertAsync(SAMPLE);

    expect(tensor).toEqual({
      kept: false,
      isDisposedInternal: false,
      shape: [113, 150, 3],
      dtype: "int32",
      size: 50850,
      strides: [450, 3],
      dataId: { id: 3 }, // next tensor in line
      id: 1,
      rankType: "3",
    });

    tensor?.dispose();
  });

  test("handle missing jpeg data sync", async () => {
    const tensor = convert("");

    expect(tensor).toEqual(null);
  });
  test("handle missing jpeg data async", async () => {
    const tensor = await convertAsync("");

    expect(tensor).toEqual(null);
  });
  test("handle missing jpeg data error async", async () => {
    return expect(convertAsync("dqdw")).rejects.toEqual(
      new Error("Input Buffer is empty")
    );
  });
});
