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

const waitForImageLoad = (img: HTMLImageElement) => {
  return new Promise<void>((resolve, reject) => {
    if (img.complete) resolve();
    img.onload = (_) => {
      resolve();
    };
    img.onerror = reject;
  });
};

const imgToDataURL = (img: HTMLImageElement): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject();

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    resolve(canvas.toDataURL("image/png"));

    canvas.remove();
  });
};

export const generateImageFromDOM = async (
  el: HTMLDivElement,
  width: string | number | undefined,
  height: string | number | undefined
): Promise<HTMLImageElement> => {
  await Promise.all(
    Array.from(el.querySelectorAll("img")).map(async (img) => {
      if (isInlineBase64Image(img.src)) return;
      await waitForImageLoad(img);
      img.src = await imgToDataURL(img);
    })
  );

  const svgUrl = await nodeToUrl(el.children[0] as HTMLElement);
  const img = await genImage(svgUrl, Number(width), Number(height));
  return img;
};
