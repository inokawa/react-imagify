# react-imagify

![npm](https://img.shields.io/npm/v/react-imagify) [![check](https://github.com/inokawa/react-imagify/actions/workflows/check.yml/badge.svg)](https://github.com/inokawa/react-imagify/actions/workflows/check.yml) [![demo](https://github.com/inokawa/react-imagify/actions/workflows/demo.yml/badge.svg)](https://github.com/inokawa/react-imagify/actions/workflows/demo.yml)

A small [React](https://github.com/facebook/react) component to render HTML as Canvas.

## Why?

Drawing HTML on Canvas is useful to apply some effect through Canvas and easy to save as image.

This component renders usual JSX on Canvas without any context switch, and does not require any heavy dependencies like three.js.

## Demo

https://inokawa.github.io/react-imagify/

## Install

```sh
npm install react-imagify
```

### Requirements

- react >= 16.8

## Usage

```jsx
import React, { useRef, useEffect } from "react";
import { Imagify } from "react-imagify";

export const Component = () => {
  const ref = useRef(null);
  useEffect(() => {
    // do something
    const canvasElement = ref.current;
  }, []);

  return (
    <div>
      <Imagify ref={ref} width={400} height={100}>
        <div style={{ fontSize: "40px" }}>
          <em>I</em> like{" "}
          <span style={{ color: "white", textShadow: "0 0 2px blue" }}>
            cheese
          </span>
        </div>
      </Imagify>
    </div>
  );
};
```

## Limitations

This lib uses [foreignObject](https://developer.mozilla.org/docs/Web/SVG/Element/foreignObject) to draw HTML inside Canvas, so how they would be rendered depends on browsers' implementation.
