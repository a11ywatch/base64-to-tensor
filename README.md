# base64-to-tensor

pure js convert a base64 image to tensor

## Installation

```
npm i base64-to-tensor --save
```

## Getting Started

Make sure to have `@tensorflow/tfjs-core` installed.

```ts
import { convert } from "base64-to-tensor";

const tensor = convert(mybase64);
```

## Why

The benefits of using pure js to calc the image is in a couple areas:

1. size and portablity required is drastically less since you do not need `cairo` or any of the native img dev converters.
1. speed is also faster since the calcs are done at hand without needing to bridge any calls.
1. can use tensors in worker threads - profit allows for properly using Tensorflow wasm backends in an API service 🥳.
