import { useEffect } from "react";
import { render } from "react-dom";

const INLINE_BASE64 = /^data:image\/.*;base64,/i;
const isInlineBase64Image = (src: string): boolean => INLINE_BASE64.test(src);

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
    img.onerror = reject;
    img.src = url;
  });
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

export const generateImageFromDOM = async (
  children: React.ReactNode,
  width: string | number | undefined,
  height: string | number | undefined,
  el: HTMLDivElement
): Promise<HTMLImageElement> => {
  await new Promise<void>((resolve) => {
    render(
      <Mounter resolve={resolve}>
        <svg width={width} height={height}>
          <foreignObject width={width} height={height}>
            {children}
          </foreignObject>
        </svg>
      </Mounter>,
      el
    );
  });
  await Promise.all(
    Array.from(el.querySelectorAll("img")).map(async (img) => {
      if (isInlineBase64Image(img.src)) return img;
      return new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          const reader = new FileReader();
          reader.onloadend = () => {
            img.src = reader.result as string;
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(xhr.response);
        };
        xhr.open("GET", img.src);
        xhr.responseType = "blob";
        xhr.send();
      });
    })
  );

  const svgUrl = await nodeToUrl(el.children[0] as HTMLElement);
  const img = await genImage(svgUrl, Number(width), Number(height));
  return img;
};
