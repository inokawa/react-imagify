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

const Component = ({
  type = "canvas",
  width: propWidth,
  height: propHeight,
  style: propStyle,
  children,
  ...props
}: ImagifyProps) => {
  const svgRef = useRef(document.createElement("div"));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dpr = window.devicePixelRatio ?? 1;
  const width = Number(propWidth ?? 0) * dpr;
  const height = Number(propHeight ?? 0) * dpr;

  const style = useMemo<React.CSSProperties>(
    () => ({
      ...propStyle,
      width: String(width / dpr) + "px",
      height: String(height / dpr) + "px",
    }),
    [propStyle, width, height]
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
            <svg width={propWidth} height={propHeight}>
              <foreignObject width={propWidth} height={propHeight}>
                {children}
              </foreignObject>
            </svg>
          </Mounter>,
          svgRef.current
        );
      });
      await Promise.all(
        Array.from(svgRef.current.querySelectorAll("img")).map(async (img) => {
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
        })
      );

      const svgStr = new XMLSerializer().serializeToString(
        svgRef.current.children[0]
      );
      const svgUrl =
        "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr);

      const img = new Image(width, height);
      img.src = svgUrl;
      img.onload = (_) => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        ctx?.drawImage(img, 0, 0);
      };
    })();
  }, [children]);

  return (
    <canvas
      {...props}
      ref={canvasRef}
      width={width}
      height={height}
      style={style}
    />
  );
};

export const Imagify = memo(Component);
