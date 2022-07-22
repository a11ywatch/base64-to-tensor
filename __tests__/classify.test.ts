import "@tensorflow/tfjs-backend-wasm";
import "isomorphic-unfetch";

import { classify, classifyAsync } from "tensornet";
import { SAMPLE } from "../__mocks__/sample";
import { ready, setBackend } from "@tensorflow/tfjs-core";

describe("classify base64 image using tensorflow Models", () => {
  beforeAll(async () => {
    await setBackend("wasm"); // set tensorflow wasm backend
    await ready();
  });

  test("use pure js", async () => {
    const classification = await classify(SAMPLE);

    expect(classification && classification[0].className).toEqual(
      "Siamese cat, Siamese"
    );
  });

  test("use sharp", async () => {
    const classification = await classifyAsync(SAMPLE);

    expect(classification && classification[0].className).toEqual(
      "Siamese cat, Siamese"
    );
  });
});
