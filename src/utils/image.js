// Shrinks an uploaded image to max 256px and returns a small data URL.
// In production you would upload the file to your server instead.
export function fileToSticker(file, max = 256) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve({ src: canvas.toDataURL("image/webp", 0.9) });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read " + file.name));
    };
    img.src = url;
  });
}
