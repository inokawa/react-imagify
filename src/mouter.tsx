import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Mounter = ({
  width,
  height,
  children,
  update,
}: {
  width: string | number | undefined;
  height: string | number | undefined;
  children: React.ReactElement;
  update: (
    el: HTMLDivElement,
    width: string | number | undefined,
    height: string | number | undefined
  ) => void;
}) => {
  const el = useState(() => document.createElement("div"))[0];

  useEffect(() => {
    update(el, width, height);
  }, [children, width, height]);

  return createPortal(
    <svg width={width} height={height}>
      <foreignObject width={width} height={height}>
        {children}
      </foreignObject>
    </svg>,
    el
  );
};
