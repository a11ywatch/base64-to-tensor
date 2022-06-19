# base64-to-tensor

[![Build and lint](https://github.com/A11yWatch/base64-to-tensor/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/A11yWatch/base64-to-tensor/actions/workflows/tests.yml)

pure js convert a base64 image to tensor

## Installation

```
npm i base64-to-tensor --save
```

## Getting Started

Make sure to have `@tensorflow/tfjs-core` installed and a valid tensorflow backend set.
View the [convert.test.ts](./__tests__/convert.test.ts) file for an example setup.

```ts
import { convert } from "base64-to-tensor";
import { setBackend } from "@tensorflow/tfjs-core";

const tensor = convert(mybase64); // The base64 must be a valid jpeg image.
```

## Why

The benefits of using pure js to calc the image is in a couple areas:

1. size and portablity required is drastically less since you do not need `cairo` or any of the native img dev converters.
1. speed is also faster since the calcs are done at hand without needing to bridge any calls.
1. can use tensors in worker threads - profit allows for properly using Tensorflow wasm backends in an API service 🥳.

## Benchmarks

This package uses CPU and performs blocking operations to gather the data for the image.
We are looking into async alternatives like sharp or Web Assembly.

Examples of some test ran on a mac m1(64gb):

| Name | chars | size     | sync  | async |
| ---- | ----- | -------- | ----- | ----- |
| jpeg | 26791 | 26.16 KB | 100ms | n/a   |
