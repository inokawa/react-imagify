import React, {
  memo,
  useMemo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  forwardRef,
} from "react";
import { render } from "react-dom";

const INLINE_BASE64 = /^data:image\/.*;base64,/i;
const isInlineBase64Image = (src: string): boolean => INLINE_BASE64.test(src);

export type ImagifyProps = JSX.IntrinsicElements["canvas"] & {
  type?: "canvas"; // | "svg";
};

const Mounter = ({
  children,
  resolve,
}: {
  children: React.ReactNode;
  resolve: () => void;
}) => {
  useEffect(() => {
    resolve();
  }, [children]);
  return <>{children}</>;
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

const nodeToUrl = async (node: HTMLElement) => {
  const svgStr = new XMLSerializer().serializeToString(node);
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr);
};

const genImage = (url: string, width: number, height: number) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image(width, height);
    img.onload = (_) => {
      resolve(img);
    };
    img.src = url;
  });
};

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
    const svgRef = useRef(document.createElement("div"));
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const dpr = window.devicePixelRatio ?? 1;
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
        await new Promise<void>((resolve) => {
          render(
            <Mounter resolve={resolve}>
              <svg width={widthProp} height={heightProp}>
                <foreignObject width={widthProp} height={heightProp}>
                  {children}
                </foreignObject>
              </svg>
            </Mounter>,
            svgRef.current
          );
        });
        await Promise.all(
          Array.from(svgRef.current.querySelectorAll("img")).map(
            async (img) => {
              if (isInlineBase64Image(img.src)) return img;
              return new Promise<string>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    img.src = reader.result as string;
                    resolve(reader.result as string);
                  };
                  reader.readAsDataURL(xhr.response);
                };
                xhr.open("GET", img.src);
                xhr.responseType = "blob";
                xhr.send();
              });
            }
          )
        );

        const svgUrl = await nodeToUrl(
          svgRef.current.children[0] as HTMLElement
        );
        const img = await genImage(
          svgUrl,
          Number(widthProp),
          Number(heightProp)
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
