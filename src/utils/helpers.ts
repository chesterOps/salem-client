export function checkLightness(hexColor: string): "light" | "dark" {
  // Remove the hash at the start if it's there
  const hex = hexColor.replace(/^#/, "");
  // Convert to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Calculate the luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.9 ? "light" : "dark";
}

// Converts a slug string to a human-readable format
export function unSlugify(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
