import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface DocMeta {
  title?: string;
  description?: string;
  slug: string;
  filePath: string;
}

// Content directory - defaults to 'content' in project root
const CONTENT_DIR = process.env.DOCS_CONTENT_DIR || path.join(process.cwd(), "content");

/**
 * Get the content directory path
 */
export function getContentDir(): string {
  return CONTENT_DIR;
}

/**
 * Check if content directory exists
 */
export function contentDirExists(): boolean {
  return fs.existsSync(CONTENT_DIR);
}

/**
 * Get a document by its slug
 */
export function getDocBySlug(slug: string[]): { content: string; frontmatter: Record<string, unknown> } | null {
  const slugPath = slug.length > 0 ? slug.join("/") : "index";

  // Try different file extensions and patterns
  const possiblePaths = [
    path.join(CONTENT_DIR, `${slugPath}.mdx`),
    path.join(CONTENT_DIR, `${slugPath}/index.mdx`),
    path.join(CONTENT_DIR, `${slugPath}.md`),
    path.join(CONTENT_DIR, `${slugPath}/index.md`),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { content, data: frontmatter } = matter(fileContent);
      return { content, frontmatter };
    }
  }

  return null;
}

/**
 * Get all document slugs for static generation
 */
export function getAllDocSlugs(): string[][] {
  if (!contentDirExists()) {
    return [];
  }

  const slugs: string[][] = [];

  function walkDir(dir: string, basePath: string[] = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walkDir(filePath, [...basePath, file]);
      } else if (file.endsWith(".mdx") || file.endsWith(".md")) {
        const name = file.replace(/\.(mdx|md)$/, "");
        if (name === "index") {
          slugs.push(basePath.length > 0 ? basePath : []);
        } else {
          slugs.push([...basePath, name]);
        }
      }
    }
  }

  walkDir(CONTENT_DIR);
  return slugs;
}

/**
 * Get all documents with metadata
 */
export function getAllDocs(): DocMeta[] {
  if (!contentDirExists()) {
    return [];
  }

  const docs: DocMeta[] = [];

  function walkDir(dir: string, basePath: string[] = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walkDir(filePath, [...basePath, file]);
      } else if (file.endsWith(".mdx") || file.endsWith(".md")) {
        const name = file.replace(/\.(mdx|md)$/, "");
        const slug = name === "index"
          ? basePath.join("/")
          : [...basePath, name].join("/");

        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data: frontmatter } = matter(fileContent);

        docs.push({
          title: frontmatter.title as string | undefined,
          description: frontmatter.description as string | undefined,
          slug,
          filePath,
        });
      }
    }
  }

  walkDir(CONTENT_DIR);
  return docs;
}
