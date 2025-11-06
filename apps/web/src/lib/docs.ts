import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { globby } from "globby";

export type DocMeta = {
  title: string;
  description?: string;
  lang?: "en" | "ar";
  slug: string; // e.g., get-started/welcome
  section: string;
};

export const CONTENT_ROOT = path.resolve(process.cwd(), "..", "..", "docs", "content");

export async function getAllDocs(lang: "en" | "ar" = "en"): Promise<DocMeta[]> {
  try {
    // Try multiple possible paths
    const possiblePaths = [
      path.resolve(process.cwd(), "..", "..", "docs", "content"),
      path.resolve(process.cwd(), "docs", "content"),
      path.resolve(__dirname, "..", "..", "..", "..", "docs", "content"),
    ];
    
    let contentRoot = CONTENT_ROOT;
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        contentRoot = p;
        break;
      }
    }
    
    const pattern = `${contentRoot}/**/*.mdx`;
    const files = await globby(pattern);
    console.log(`[getAllDocs] Content root: ${contentRoot}`);
    console.log(`[getAllDocs] Exists: ${fs.existsSync(contentRoot)}`);
    console.log(`[getAllDocs] Files found: ${files.length}`);
    
    if (files.length === 0) {
      console.error(`[getAllDocs] No files found! Searched: ${pattern}`);
      return [];
    }
    
    const out: DocMeta[] = [];
    for (const file of files) {
      try {
        const raw = fs.readFileSync(file, "utf-8");
        const { data } = matter(raw);
        const rel = path.relative(contentRoot, file).replace(/\\/g, "/");
        const withoutExt = rel.replace(/\.mdx?$/, "");
        const section = withoutExt.split("/")[0];
        const meta: DocMeta = {
          title: (data.title as string) || withoutExt.split("/").pop()!,
          description: (data.description as string) || "",
          lang: (data.lang as "en" | "ar") || "en",
          slug: withoutExt,
          section,
        };
        if (meta.lang === lang) out.push(meta);
      } catch (err) {
        console.error(`[getAllDocs] Error reading file ${file}:`, err);
      }
    }
    console.log(`[getAllDocs] Returning ${out.length} docs for lang=${lang}`);
    return out;
  } catch (error) {
    console.error("[getAllDocs] Error:", error);
    return [];
  }
}

export async function getDocBySlug(slug: string, lang: "en" | "ar" = "en"): Promise<{ content: string; meta: DocMeta } | null> {
  // Find all files matching this slug
  const files = await globby(`${CONTENT_ROOT}/${slug}.mdx`);
  if (files.length === 0) return null;
  // Choose by lang
  let picked: string | null = null;
  for (const f of files) {
    const fm = matter(fs.readFileSync(f, "utf-8")).data as { lang?: string };
    if (fm.lang === lang) {
      picked = f;
      break;
    }
  }
  if (!picked) picked = files[0];
  const raw = fs.readFileSync(picked, "utf-8");
  const { content, data } = matter(raw);
  const section = slug.split("/")[0];
  const frontMatter = data as { title?: string; description?: string; lang?: string };
  const meta: DocMeta = {
    title: frontMatter.title || slug.split("/").pop()!,
    description: frontMatter.description || "",
    lang: (frontMatter.lang as "en" | "ar") || "en",
    slug,
    section,
  };
  return { content, meta };
}


