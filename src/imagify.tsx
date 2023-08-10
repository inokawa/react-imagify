import {
  memo,
  useMemo,
  useCallback,
  useLayoutEffect,
  useRef,
  forwardRef,
} from "react";
import { generateImageFromDOM } from "./dom";
import { Mounter } from "./mouter";

export type ImagifyProps = Omit<JSX.IntrinsicElements["canvas"], "children"> & {
  children: React.ReactElement;
};

const mergeRefs = <T extends any>(
  ...refs: React.MutableRefObject<T>[]
): React.RefCallback<T> => {
  return useCallback((value) => {
    refs.forEach((ref) => {
      if (!ref || !value) return;
      ref.current = value;
    });
  }, refs);
};

const Component = forwardRef<HTMLCanvasElement, ImagifyProps>(
  (
    {
      width: widthProp,
      height: heightProp,
      style: styleProp,
      children,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const dpr = window.devicePixelRatio ?? 1;
    const width = Number(widthProp ?? 0);
    const height = Number(heightProp ?? 0);
    const canvasWidth = width * dpr;
    const canvasHeight = height * dpr;

    const style = useMemo<React.CSSProperties>(
      () => ({
        ...styleProp,
        width: String(width) + "px",
        height: String(height) + "px",
      }),
      [styleProp, width, height]
    );

    useLayoutEffect(() => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
    }, []);

    const update = useCallback(
      async (
        el: DocumentFragment,
        w: string | number | undefined,
        h: string | number | undefined
      ) => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        const img = await generateImageFromDOM(el, w, h);
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, 0, 0);
      },
      [canvasWidth, canvasHeight]
    );

    return (
      <canvas
        {...props}
        ref={mergeRefs(ref as React.RefObject<HTMLCanvasElement>, canvasRef)}
        width={canvasWidth}
        height={canvasHeight}
        style={style}
      >
        {children}
        <Mounter width={widthProp} height={heightProp} update={update}>
          {children}
        </Mounter>
      </canvas>
    );
  }
);

export const Imagify = memo(Component) as typeof Component;
