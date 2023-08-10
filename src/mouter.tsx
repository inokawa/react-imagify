import { useEffect, useRef } from "react";
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
    el: DocumentFragment,
    width: string | number | undefined,
    height: string | number | undefined
  ) => void;
}) => {
  const elRef = useRef<DocumentFragment | undefined>();
  const el =
    elRef.current || (elRef.current = document.createDocumentFragment());

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
