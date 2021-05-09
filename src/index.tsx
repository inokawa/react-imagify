import React, { memo, useCallback, useEffect, useRef, forwardRef } from "react";
import { render } from "react-dom";

export type ImagifyProps = JSX.IntrinsicElements["canvas"] & {
  type?: "canvas" | "svg";
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

const Component = ({ type = "canvas", children, ...props }: ImagifyProps) => {
  const svgRef = useRef(document.createElement("div"));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    (async () => {
      const width = Number(props.width);
      const height = Number(props.height);
      await new Promise<void>((resolve) => {
        render(
          <Mounter resolve={resolve}>
            <svg width={width} height={height}>
              <foreignObject width="100%" height="100%">
                {children}
              </foreignObject>
            </svg>
          </Mounter>,
          svgRef.current
        );
      });
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

  return <canvas ref={canvasRef} {...props} />;
};

export const Imagify = memo(Component);
