/** Three.js does not resolve CSS variables; read their computed values after ClientOnly mounts. */
export function sceneColor(token: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}