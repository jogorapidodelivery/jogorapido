import { empty } from "./StringUteis";

const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
export const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
export const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
export const brightness = (cor: any, brightness = 1) => {
    cor = (empty(cor) || cor === "#fff" || cor === "#ffffff" || cor === "#FFF" || cor === "#FFFFFF") ? "#cccccc" : cor
    const { r, g, b } = typeof cor === "string" ? hexToRgb(cor) : cor
    const ir = Math.floor(r * brightness);
    const ig = Math.floor(g * brightness)
    const ib = Math.floor(b * brightness);
return `rgb(${ir}, ${ig}, ${ib})`
}
