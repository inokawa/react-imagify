import {
  memo,
  useMemo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  forwardRef,
} from "react";
import { generateImageFromDOM } from "./dom";

export type ImagifyProps = JSX.IntrinsicElements["canvas"] & {
  type?: "canvas"; // | "svg";
};

function mergeRefs<T extends any>(
  ...refs: React.MutableRefObject<T>[]
): React.RefCallback<T> {
  return useCallback((value) => {
    refs.forEach((ref) => {
      if (!ref || !value) return;
      ref.current = value;
    });
  }, refs);
}

const Component = forwardRef<HTMLCanvasElement, ImagifyProps>(
  (
    {
      type = "canvas",
      width: widthProp,
      height: heightProp,
      style: styleProp,
      children,
      ...props
    },
    ref
  ) => {
    const svgRef = useRef<HTMLDivElement>(null!);
    !svgRef.current && (svgRef.current = document.createElement("div"));
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const dpr = devicePixelRatio ?? 1;
    const width = Number(widthProp ?? 0) * dpr;
    const height = Number(heightProp ?? 0) * dpr;

    const style = useMemo<React.CSSProperties>(
      () => ({
        ...styleProp,
        width: String(width / dpr) + "px",
        height: String(height / dpr) + "px",
      }),
      [styleProp, width, height]
    );

    useLayoutEffect(() => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
    }, []);

    useEffect(() => {
      (async () => {
        const img = await generateImageFromDOM(
          children,
          widthProp,
          heightProp,
          svgRef.current
        );

        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        ctx?.drawImage(img, 0, 0);
      })();
    }, [children, widthProp, heightProp]);

    return (
      <canvas
        {...props}
        ref={mergeRefs(ref as React.RefObject<HTMLCanvasElement>, canvasRef)}
        width={width}
        height={height}
        style={style}
      >
        {children}
      </canvas>
    );
  }
);

export const Imagify = memo(Component) as typeof Component;
