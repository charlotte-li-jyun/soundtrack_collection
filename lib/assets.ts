import fs from "node:fs";
import path from "node:path";

/**
 * 检查 /public 下的文件是否存在（在构建时运行）。
 * 存在则返回原路径，不存在则返回 null，组件会据此显示占位设计。
 * 这样上传照片 / 封面后，无需修改任何组件。
 */
export function publicAsset(p: string | null | undefined): string | null {
  if (!p) return null;
  const full = path.join(process.cwd(), "public", p.replace(/^\//, ""));
  return fs.existsSync(full) ? p : null;
}
