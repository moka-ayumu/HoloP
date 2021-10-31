export function rgbToHex(rgbArr: number[]): string {
  return (
    "#" +
    rgbArr
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}
