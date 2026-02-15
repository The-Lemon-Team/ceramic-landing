/** Кодирует путь к статическому файлу для использования в URL (пробелы, скобки и т.д.). */
export function assetUrl(path: string): string {
  const i = path.lastIndexOf("/");
  if (i === -1) return encodeURIComponent(path);
  return path.slice(0, i + 1) + encodeURIComponent(path.slice(i + 1));
}
