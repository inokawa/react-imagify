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

const imgToDataURL = (img: HTMLImageElement): Promise<void> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        img.src = reader.result as string;
        resolve();
      };
      reader.onerror = reject;
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", img.src);
    xhr.responseType = "blob";
    xhr.send();
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
      await imgToDataURL(img);
    })
  );

  const svgUrl = await nodeToUrl(el.children[0] as HTMLElement);
  const img = await genImage(svgUrl, Number(width), Number(height));
  return img;
};
